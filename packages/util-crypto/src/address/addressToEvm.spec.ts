// Copyright 2017-2025 @pezkuwi/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@pezkuwi/dev-test/globals.d.ts" />

import { hexToU8a } from '@pezkuwi/util';

import { addressToEvm } from './addressToEvm.js';

describe('addressToEvm', (): void => {
  it('creates a valid known EVM address', (): void => {
    expect(
      addressToEvm('KWCv1L3QX9LDPwY4VzvLmarEmXjVJidUzZcinvVnmxAJJCBou')
    ).toEqual(hexToU8a('0x03b9dc646dd71118e5f7fda681ad9eca36eb3ee9'));
  });
});
