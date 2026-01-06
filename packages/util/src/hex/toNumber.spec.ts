// Copyright 2017-2025 @pezkuwi/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@pezkuwi/dev-test/globals.d.ts" />

import { hexToNumber } from './index.js';

describe('hexToNumber', (): void => {
  it('converts an empty to NaN', (): void => {
    expect(
      hexToNumber()
    ).toEqual(NaN);
  });

  it('converts to a number from hex', (): void => {
    expect(
      hexToNumber('0x1234')
    ).toEqual(0x1234);
  });
});
