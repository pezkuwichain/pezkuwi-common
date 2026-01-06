// Copyright 2017-2025 @pezkuwi/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@pezkuwi/dev-test/globals.d.ts" />

import type { Keypair } from '../../types.js';

import { ed25519PairFromRandom } from '../index.js';

describe('ed25519PairFromRandom', (): void => {
  let keypair: Keypair;

  beforeEach((): void => {
    keypair = ed25519PairFromRandom();
  });

  it('generates a valid publicKey', (): void => {
    expect(
      keypair.publicKey
    ).toHaveLength(32);
  });

  it('generates a valid secretKey', (): void => {
    expect(
      keypair.secretKey
    ).toHaveLength(64);
  });
});
