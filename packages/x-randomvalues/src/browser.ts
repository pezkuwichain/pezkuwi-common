// Copyright 2017-2025 @pezkuwi/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@pezkuwi/x-global';

export { packageInfo } from './packageInfo.js';

export const crypto = xglobal.crypto;

// getRandomValues needs to be called on the crypto object,
// hence the need for the wrapper function
export function getRandomValues <T extends Uint8Array> (arr: T): T {
  return crypto.getRandomValues(arr);
}
