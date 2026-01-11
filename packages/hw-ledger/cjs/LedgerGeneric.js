"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerGeneric = exports.packageInfo = void 0;
const ledger_substrate_1 = require("@zondax/ledger-substrate");
const hw_ledger_transports_1 = require("@pezkuwi/hw-ledger-transports");
const util_1 = require("@pezkuwi/util");
const defaults_js_1 = require("./defaults.js");
var packageInfo_js_1 = require("./packageInfo.js");
Object.defineProperty(exports, "packageInfo", { enumerable: true, get: function () { return packageInfo_js_1.packageInfo; } });
/** @internal Wraps a PolkadotGenericApp call, checking the result for any errors which result in a rejection */
async function wrapError(promise) {
    let result;
    try {
        result = await promise;
    }
    catch (e) {
        // We check to see if the propogated error is the newer ResponseError type.
        // The response code use to be part of the result, but with the latest breaking changes from 0.42.x
        // the interface and it's types have completely changed.
        if (e.returnCode) {
            throw new Error(`${e.returnCode}: ${e.errorMessage}`);
        }
        throw new Error(e.message);
    }
    return result;
}
/** @internal Wraps a signEd25519/signRawEd25519 call and returns the associated signature */
function sign(method, message, slip44, accountIndex = 0, addressOffset = 0) {
    const bip42Path = `m/44'/${slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;
    return async (app) => {
        const { signature } = await wrapError(app[method](bip42Path, (0, util_1.u8aToBuffer)(message)));
        return {
            signature: (0, util_1.hexAddPrefix)(signature.toString('hex'))
        };
    };
}
/** @internal Wraps a signEcdsa/signRawEcdsa call and returns the associated signature */
function signEcdsa(method, message, slip44, accountIndex = 0, addressOffset = 0) {
    const bip42Path = `m/44'/${slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;
    return async (app) => {
        const { r, s, v } = await wrapError(app[method](bip42Path, (0, util_1.u8aToBuffer)(message)));
        const signature = Buffer.concat([r, s, v]);
        return {
            signature: (0, util_1.hexAddPrefix)(signature.toString('hex'))
        };
    };
}
/** @internal Wraps a signWithMetadataEd25519 call and returns the associated signature */
function signWithMetadata(message, slip44, accountIndex = 0, addressOffset = 0, { metadata } = {}) {
    const bip42Path = `m/44'/${slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;
    return async (app) => {
        if (!metadata) {
            throw new Error('The metadata option must be present when using signWithMetadata');
        }
        const bufferMsg = Buffer.from(message);
        const { signature } = await wrapError(app.signWithMetadataEd25519(bip42Path, bufferMsg, metadata));
        return {
            signature: (0, util_1.hexAddPrefix)(signature.toString('hex'))
        };
    };
}
/** @internal Wraps a signWithMetadataEcdsa call and returns the associated signature */
function signWithMetadataEcdsa(message, slip44, accountIndex = 0, addressOffset = 0, { metadata } = {}) {
    const bip42Path = `m/44'/${slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;
    return async (app) => {
        if (!metadata) {
            throw new Error('The metadata option must be present when using signWithMetadata');
        }
        const bufferMsg = Buffer.from(message);
        const { r, s, v } = await wrapError(app.signWithMetadataEcdsa(bip42Path, bufferMsg, metadata));
        const signature = Buffer.concat([r, s, v]);
        return {
            signature: (0, util_1.hexAddPrefix)(signature.toString('hex'))
        };
    };
}
/**
 * @name Ledger
 *
 * @description
 * A very basic wrapper for a ledger app -
 *   - it connects automatically on use, creating an underlying interface as required
 *   - Promises reject with errors (unwrapped errors from @zondax/ledger-substrate-js)
 */
class LedgerGeneric {
    #transportDef;
    #slip44;
    /**
     * The chainId is represented by the chains token in all lowercase. Example: Polkadot -> dot
     */
    #chainId;
    /**
     * The metaUrl is seen as a server url that the underlying `PolkadotGenericApp` will use to
     * retrieve the signature given a tx blob, and a chainId. It is important to note that if you would like to avoid
     * having any network calls made, use `signWithMetadata`, and avoid `sign`.
     */
    #metaUrl;
    #app = null;
    constructor(transport, chain, slip44, chainId, metaUrl) {
        const ledgerName = defaults_js_1.ledgerApps[chain];
        const transportDef = hw_ledger_transports_1.transports.find(({ type }) => type === transport);
        if (!ledgerName) {
            throw new Error(`Unsupported Ledger chain ${chain}`);
        }
        else if (!transportDef) {
            throw new Error(`Unsupported Ledger transport ${transport}`);
        }
        this.#metaUrl = metaUrl;
        this.#chainId = chainId;
        this.#slip44 = slip44;
        this.#transportDef = transportDef;
    }
    /**
     * @description Returns the address associated with a specific Ed25519 account & address offset. Optionally
     * asks for on-device confirmation
     */
    async getAddress(ss58Prefix, confirm = false, accountIndex = 0, addressOffset = 0) {
        const bip42Path = `m/44'/${this.#slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;
        return this.withApp(async (app) => {
            const { address, pubKey } = await wrapError(app.getAddressEd25519(bip42Path, ss58Prefix, confirm));
            return {
                address,
                publicKey: (0, util_1.hexAddPrefix)(pubKey)
            };
        });
    }
    /**
     * @description Returns the address associated with a specific ecdsa account & address offset. Optionally
     * asks for on-device confirmation
     */
    async getAddressEcdsa(confirm = false, accountIndex = 0, addressOffset = 0) {
        const bip42Path = `m/44'/${this.#slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;
        return this.withApp(async (app) => {
            const { address, pubKey } = await wrapError(app.getAddressEcdsa(bip42Path, confirm));
            return {
                address,
                publicKey: (0, util_1.hexAddPrefix)(pubKey)
            };
        });
    }
    /**
     * @description Returns the version of the Ledger application on the device
     */
    async getVersion() {
        return this.withApp(async (app) => {
            const { deviceLocked: isLocked, major, minor, patch, testMode: isTestMode } = await wrapError(app.getVersion());
            return {
                isLocked: !!isLocked,
                isTestMode: !!isTestMode,
                version: [major || 0, minor || 0, patch || 0]
            };
        });
    }
    /**
     * @description Signs a transaction on the Ledger device. This requires the LedgerGeneric class to be instantiated with `chainId`, and `metaUrl`
     */
    async sign(message, accountIndex, addressOffset) {
        return this.withApp(sign('signEd25519', message, this.#slip44, accountIndex, addressOffset));
    }
    /**
     * @description Signs a message (non-transactional) on the Ledger device
     */
    async signRaw(message, accountIndex, addressOffset) {
        return this.withApp(sign('signRawEd25519', (0, util_1.u8aWrapBytes)(message), this.#slip44, accountIndex, addressOffset));
    }
    /**
     * @description Signs a transaction on the Ledger device with Ecdsa. This requires the LedgerGeneric class to be instantiated with `chainId`, and `metaUrl`
     */
    async signEcdsa(message, accountIndex, addressOffset) {
        return this.withApp(signEcdsa('signEcdsa', (0, util_1.u8aWrapBytes)(message), this.#slip44, accountIndex, addressOffset));
    }
    /**
     * @description Signs a message with Ecdsa (non-transactional) on the Ledger device
     */
    async signRawEcdsa(message, accountIndex, addressOffset) {
        return this.withApp(signEcdsa('signRawEcdsa', (0, util_1.u8aWrapBytes)(message), this.#slip44, accountIndex, addressOffset));
    }
    /**
     * @description Signs a transaction on the ledger device provided some metadata.
     */
    async signWithMetadata(message, accountIndex, addressOffset, options) {
        return this.withApp(signWithMetadata(message, this.#slip44, accountIndex, addressOffset, options));
    }
    /**
     * @description Signs a transaction on the ledger device for an ecdsa signature provided some metadata.
     */
    async signWithMetadataEcdsa(message, accountIndex, addressOffset, options) {
        return this.withApp(signWithMetadataEcdsa(message, this.#slip44, accountIndex, addressOffset, options));
    }
    /**
     * @internal
     *
     * Returns a created PolkadotGenericApp to perform operations against. Generally
     * this is only used internally, to ensure consistent bahavior.
     */
    async withApp(fn) {
        try {
            if (!this.#app) {
                const transport = await this.#transportDef.create();
                // We need this override for the actual type passing - the Deno environment
                // is quite a bit stricter and it yields invalids between the two (specifically
                // since we mangle the imports from .default in the types for CJS/ESM and between
                // esm.sh versions this yields problematic outputs)
                //
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
                this.#app = new ledger_substrate_1.PolkadotGenericApp(transport, this.#chainId, this.#metaUrl);
            }
            return await fn(this.#app);
        }
        catch (error) {
            this.#app = null;
            throw error;
        }
    }
}
exports.LedgerGeneric = LedgerGeneric;
