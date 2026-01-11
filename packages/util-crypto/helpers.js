import { hasBigInt, u8aToHex, u8aToU8a } from '@pezkuwi/util';
import { isReady } from '@pezkuwi/wasm-crypto';
/** @internal */
export function createAsHex(fn) {
    return (...args) => u8aToHex(fn(...args));
}
/** @internal */
export function createBitHasher(bitLength, fn) {
    return (data, onlyJs) => fn(data, bitLength, onlyJs);
}
/** @internal */
export function createDualHasher(wa, js) {
    return (value, bitLength = 256, onlyJs) => {
        const u8a = u8aToU8a(value);
        return !hasBigInt || (!onlyJs && isReady())
            ? wa[bitLength](u8a)
            : js[bitLength](u8a);
    };
}
