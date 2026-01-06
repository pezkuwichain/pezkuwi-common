// Copyright 2017-2025 @pezkuwi/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@pezkuwi/dev-test/globals.d.ts" />

import { assert } from './index.js';

describe('index', (): void => {
  it('exports ok', (): void => {
    expect(assert).toBeDefined();
  });
});
