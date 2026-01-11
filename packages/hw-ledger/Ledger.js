import { newSubstrateApp } from '@zondax/ledger-substrate';
import { transports } from '@pezkuwi/hw-ledger-transports';
import { hexAddPrefix, u8aToBuffer, u8aWrapBytes } from '@pezkuwi/util';
import { LEDGER_DEFAULT_ACCOUNT, LEDGER_DEFAULT_CHANGE, LEDGER_DEFAULT_INDEX, LEDGER_SUCCESS_CODE } from './constants.js';
import { ledgerApps } from './defaults.js';
export { packageInfo } from './packageInfo.js';
/** @internal Wraps a SubstrateApp call, checking the result for any errors which result in a rejection */
async function wrapError(promise) {
    const result = await promise;
    if (result.return_code !== LEDGER_SUCCESS_CODE) {
        throw new Error(result.error_message);
    }
    return result;
}
/** @internal Wraps a sign/signRaw call and returns the associated signature */
function sign(method, message, accountOffset = 0, addressOffset = 0, { account = LEDGER_DEFAULT_ACCOUNT, addressIndex = LEDGER_DEFAULT_INDEX, change = LEDGER_DEFAULT_CHANGE } = {}) {
    return async (app) => {
        const { signature } = await wrapError(app[method](account + accountOffset, change, addressIndex + addressOffset, u8aToBuffer(message)));
        return {
            signature: hexAddPrefix(signature.toString('hex'))
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
export class Ledger {
    #ledgerName;
    #transportDef;
    #app = null;
    constructor(transport, chain) {
        const ledgerName = ledgerApps[chain];
        const transportDef = transports.find(({ type }) => type === transport);
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
    async getAddress(confirm = false, accountOffset = 0, addressOffset = 0, { account = LEDGER_DEFAULT_ACCOUNT, addressIndex = LEDGER_DEFAULT_INDEX, change = LEDGER_DEFAULT_CHANGE } = {}) {
        return this.withApp(async (app) => {
            const { address, pubKey } = await wrapError(app.getAddress(account + accountOffset, change, addressIndex + addressOffset, confirm));
            return {
                address,
                publicKey: hexAddPrefix(pubKey)
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
        return this.withApp(sign('signRaw', u8aWrapBytes(message), accountOffset, addressOffset, options));
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
                this.#app = newSubstrateApp(transport, this.#ledgerName);
            }
            return await fn(this.#app);
        }
        catch (error) {
            this.#app = null;
            throw error;
        }
    }
}
