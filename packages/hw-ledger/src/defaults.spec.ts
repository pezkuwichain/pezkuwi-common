// Copyright 2017-2025 @pezkuwi/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@pezkuwi/dev-test/globals.d.ts" />

import { supportedApps } from '@zondax/ledger-substrate';

import { prevLedgerRecord } from './defaults.js';

describe('ledgerApps', (): void => {
  for (const k of Object.keys(prevLedgerRecord)) {
    it(`${k} is available in @zondax/ledger-substrate`, (): void => {
      expect(
        supportedApps.find(({ name }) =>
          name === prevLedgerRecord[k]
        )
      ).toBeDefined();
    });
  }
});
