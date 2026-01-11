"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ledger = exports.packageInfo = void 0;
const ledger_substrate_1 = require("@zondax/ledger-substrate");
const hw_ledger_transports_1 = require("@pezkuwi/hw-ledger-transports");
const util_1 = require("@pezkuwi/util");
const constants_js_1 = require("./constants.js");
const defaults_js_1 = require("./defaults.js");
var packageInfo_js_1 = require("./packageInfo.js");
Object.defineProperty(exports, "packageInfo", { enumerable: true, get: function () { return packageInfo_js_1.packageInfo; } });
/** @internal Wraps a SubstrateApp call, checking the result for any errors which result in a rejection */
async function wrapError(promise) {
    const result = await promise;
    if (result.return_code !== constants_js_1.LEDGER_SUCCESS_CODE) {
        throw new Error(result.error_message);
    }
    return result;
}
/** @internal Wraps a sign/signRaw call and returns the associated signature */
function sign(method, message, accountOffset = 0, addressOffset = 0, { account = constants_js_1.LEDGER_DEFAULT_ACCOUNT, addressIndex = constants_js_1.LEDGER_DEFAULT_INDEX, change = constants_js_1.LEDGER_DEFAULT_CHANGE } = {}) {
    return async (app) => {
        const { signature } = await wrapError(app[method](account + accountOffset, change, addressIndex + addressOffset, (0, util_1.u8aToBuffer)(message)));
        return {
            signature: (0, util_1.hexAddPrefix)(signature.toString('hex'))
        };
    };
}
/**
 * @name Ledger
 *
 * @description
 * Legacy wrapper for a ledger app -
 *   - it connects automatically on use, creating an underlying interface as required
 *   - Promises reject with errors (unwrapped errors from @zondax/ledger-substrate)
 * @deprecated Use LedgerGeneric for up to date integration with ledger
 */
class Ledger {
    #ledgerName;
    #transportDef;
    #app = null;
    constructor(transport, chain) {
        const ledgerName = defaults_js_1.ledgerApps[chain];
        const transportDef = hw_ledger_transports_1.transports.find(({ type }) => type === transport);
        if (!ledgerName) {
            throw new Error(`Unsupported Ledger chain ${chain}`);
        }
        else if (!transportDef) {
            throw new Error(`Unsupported Ledger transport ${transport}`);
        }
        this.#ledgerName = ledgerName;
        this.#transportDef = transportDef;
    }
    /**
     * Returns the address associated with a specific account & address offset. Optionally
     * asks for on-device confirmation
     */
    async getAddress(confirm = false, accountOffset = 0, addressOffset = 0, { account = constants_js_1.LEDGER_DEFAULT_ACCOUNT, addressIndex = constants_js_1.LEDGER_DEFAULT_INDEX, change = constants_js_1.LEDGER_DEFAULT_CHANGE } = {}) {
        return this.withApp(async (app) => {
            const { address, pubKey } = await wrapError(app.getAddress(account + accountOffset, change, addressIndex + addressOffset, confirm));
            return {
                address,
                publicKey: (0, util_1.hexAddPrefix)(pubKey)
            };
        });
    }
    /**
     * Returns the version of the Ledger application on the device
     */
    async getVersion() {
        return this.withApp(async (app) => {
            const { device_locked: isLocked, major, minor, patch, test_mode: isTestMode } = await wrapError(app.getVersion());
            return {
                isLocked,
                isTestMode,
                version: [major, minor, patch]
            };
        });
    }
    /**
     * Signs a transaction on the Ledger device
     */
    async sign(message, accountOffset, addressOffset, options) {
        return this.withApp(sign('sign', message, accountOffset, addressOffset, options));
    }
    /**
     * Signs a message (non-transactional) on the Ledger device
     */
    async signRaw(message, accountOffset, addressOffset, options) {
        return this.withApp(sign('signRaw', (0, util_1.u8aWrapBytes)(message), accountOffset, addressOffset, options));
    }
    /**
     * @internal
     *
     * Returns a created SubstrateApp to perform operations against. Generally
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
                this.#app = (0, ledger_substrate_1.newSubstrateApp)(transport, this.#ledgerName);
            }
            return await fn(this.#app);
        }
        catch (error) {
            this.#app = null;
            throw error;
        }
    }
}
exports.Ledger = Ledger;
