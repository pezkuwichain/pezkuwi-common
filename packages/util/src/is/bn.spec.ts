// Copyright 2017-2025 @pezkuwi/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@pezkuwi/dev-test/globals.d.ts" />

import { BN } from '../bn/index.js';
import { isBn } from './index.js';

describe('isBN', (): void => {
  it('returns true when a BN value', (): void => {
    expect(
      isBn(new BN(123))
    ).toEqual(true);
  });

  it('returns false on non-BN values', (): void => {
    expect(
      isBn(0)
    ).toEqual(false);
  });
});
