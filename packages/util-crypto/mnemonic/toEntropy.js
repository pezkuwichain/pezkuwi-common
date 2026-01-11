import { hasBigInt } from '@pezkuwi/util';
import { bip39ToEntropy, isReady } from '@pezkuwi/wasm-crypto';
import { mnemonicToEntropy as jsToEntropy } from './bip39.js';
export function mnemonicToEntropy(mnemonic, wordlist, onlyJs) {
    return !hasBigInt || (!wordlist && !onlyJs && isReady())
        ? bip39ToEntropy(mnemonic)
        : jsToEntropy(mnemonic, wordlist);
}
