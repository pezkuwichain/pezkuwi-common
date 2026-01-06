// Copyright 2017-2025 @pezkuwi/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@pezkuwi/dev-test/globals.d.ts" />

import { isNull } from './index.js';

describe('isNull', (): void => {
  it('returns true when a null value', (): void => {
    expect(
      isNull(null)
    ).toEqual(true);
  });

  it('returns false on non-null values', (): void => {
    expect(
      isNull()
    ).toEqual(false);
  });
});
