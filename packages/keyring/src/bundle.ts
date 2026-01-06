// Copyright 2017-2025 @pezkuwi/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

// all external
// eslint-disable-next-line deprecation/deprecation
export { decodeAddress, encodeAddress, setSS58Format } from '@pezkuwi/util-crypto';

// all named
export { Keyring } from './keyring.js';
export { packageInfo } from './packageInfo.js';
export { createPair } from './pair/index.js';
export { createTestKeyring } from './testing.js';
export { createTestPairs } from './testingPairs.js';

// all starred
export * from './defaults.js';
