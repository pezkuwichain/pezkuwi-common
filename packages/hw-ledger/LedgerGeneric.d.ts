import type { TransportType } from '@pezkuwi/hw-ledger-transports/types';
import type { AccountOptionsGeneric, LedgerAddress, LedgerSignature, LedgerVersion } from './types.js';
import { PolkadotGenericApp } from '@zondax/ledger-substrate';
import { ledgerApps } from './defaults.js';
export { packageInfo } from './packageInfo.js';
type Chain = keyof typeof ledgerApps;
/**
 * @name Ledger
 *
 * @description
 * A very basic wrapper for a ledger app -
 *   - it connects automatically on use, creating an underlying interface as required
 *   - Promises reject with errors (unwrapped errors from @zondax/ledger-substrate-js)
 */
export declare class LedgerGeneric {
    #private;
    constructor(transport: TransportType, chain: Chain, slip44: number, chainId?: string, metaUrl?: string);
    /**
     * @description Returns the address associated with a specific Ed25519 account & address offset. Optionally
     * asks for on-device confirmation
     */
    getAddress(ss58Prefix: number, confirm?: boolean, accountIndex?: number, addressOffset?: number): Promise<LedgerAddress>;
    /**
     * @description Returns the address associated with a specific ecdsa account & address offset. Optionally
     * asks for on-device confirmation
     */
    getAddressEcdsa(confirm?: boolean, accountIndex?: number, addressOffset?: number): Promise<LedgerAddress>;
    /**
     * @description Returns the version of the Ledger application on the device
     */
    getVersion(): Promise<LedgerVersion>;
    /**
     * @description Signs a transaction on the Ledger device. This requires the LedgerGeneric class to be instantiated with `chainId`, and `metaUrl`
     */
    sign(message: Uint8Array, accountIndex?: number, addressOffset?: number): Promise<LedgerSignature>;
    /**
     * @description Signs a message (non-transactional) on the Ledger device
     */
    signRaw(message: Uint8Array, accountIndex?: number, addressOffset?: number): Promise<LedgerSignature>;
    /**
     * @description Signs a transaction on the Ledger device with Ecdsa. This requires the LedgerGeneric class to be instantiated with `chainId`, and `metaUrl`
     */
    signEcdsa(message: Uint8Array, accountIndex?: number, addressOffset?: number): Promise<LedgerSignature>;
    /**
     * @description Signs a message with Ecdsa (non-transactional) on the Ledger device
     */
    signRawEcdsa(message: Uint8Array, accountIndex?: number, addressOffset?: number): Promise<LedgerSignature>;
    /**
     * @description Signs a transaction on the ledger device provided some metadata.
     */
    signWithMetadata(message: Uint8Array, accountIndex?: number, addressOffset?: number, options?: Partial<AccountOptionsGeneric>): Promise<LedgerSignature>;
    /**
     * @description Signs a transaction on the ledger device for an ecdsa signature provided some metadata.
     */
    signWithMetadataEcdsa(message: Uint8Array, accountIndex?: number, addressOffset?: number, options?: Partial<AccountOptionsGeneric>): Promise<LedgerSignature>;
    /**
     * @internal
     *
     * Returns a created PolkadotGenericApp to perform operations against. Generally
     * this is only used internally, to ensure consistent bahavior.
     */
    withApp<T>(fn: (app: PolkadotGenericApp) => Promise<T>): Promise<T>;
}
