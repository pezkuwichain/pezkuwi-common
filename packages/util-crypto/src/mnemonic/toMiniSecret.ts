// Copyright 2017-2025 @pezkuwi/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a } from '@pezkuwi/util';
import { bip39ToMiniSecret, isReady } from '@pezkuwi/wasm-crypto';

import { pbkdf2Encode } from '../pbkdf2/index.js';
import { mnemonicToEntropy } from './toEntropy.js';
import { mnemonicValidate } from './validate.js';

export function mnemonicToMiniSecret (mnemonic: string, password = '', wordlist?: string[], onlyJs?: boolean): Uint8Array {
  if (!mnemonicValidate(mnemonic, wordlist, onlyJs)) {
    throw new Error('Invalid bip39 mnemonic specified');
  } else if (!wordlist && !onlyJs && isReady()) {
    return bip39ToMiniSecret(mnemonic, password);
  }

  const entropy = mnemonicToEntropy(mnemonic, wordlist);
  const salt = stringToU8a(`mnemonic${password}`);

  // return the first 32 bytes as the seed
  return pbkdf2Encode(entropy, salt).password.slice(0, 32);
}
