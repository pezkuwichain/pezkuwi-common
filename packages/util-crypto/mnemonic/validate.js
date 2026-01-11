import { hasBigInt } from '@pezkuwi/util';
import { bip39Validate, isReady } from '@pezkuwi/wasm-crypto';
import { validateMnemonic } from './bip39.js';
/**
 * @name mnemonicValidate
 * @summary Validates a mnemonic input using [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).
 * @example
 * <BR>
 *
 * ```javascript
 * import { mnemonicGenerate, mnemonicValidate } from '@pezkuwi/util-crypto';
 *
 * const mnemonic = mnemonicGenerate(); // => string
 * const isValidMnemonic = mnemonicValidate(mnemonic); // => boolean
 * ```
 */
export function mnemonicValidate(mnemonic, wordlist, onlyJs) {
    return !hasBigInt || (!wordlist && !onlyJs && isReady())
        ? bip39Validate(mnemonic)
        : validateMnemonic(mnemonic, wordlist);
}
