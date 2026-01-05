// Copyright 2017-2025 @polkadot/x-ws authors & contributors
// SPDX-License-Identifier: Apache-2.0

import ws from 'ws';

import { extractGlobal } from '@pezkuwi/x-global';

export { packageInfo } from './packageInfo.js';

export const WebSocket = /*#__PURE__*/ extractGlobal('WebSocket', ws);
