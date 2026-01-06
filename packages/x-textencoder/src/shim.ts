// Copyright 2017-2025 @pezkuwi/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { exposeGlobal } from '@pezkuwi/x-global';
import { TextEncoder } from '@pezkuwi/x-textencoder';

exposeGlobal('TextEncoder', TextEncoder);
