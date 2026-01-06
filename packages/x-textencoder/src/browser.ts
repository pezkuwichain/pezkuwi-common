// Copyright 2017-2025 @pezkuwi/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { extractGlobal } from '@pezkuwi/x-global';

import { TextEncoder as Fallback } from './fallback.js';

export { packageInfo } from './packageInfo.js';

export const TextEncoder = /*#__PURE__*/ extractGlobal('TextEncoder', Fallback);
