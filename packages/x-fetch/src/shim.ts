// Copyright 2017-2025 @pezkuwi/x-fetch authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { fetch } from '@pezkuwi/x-fetch';
import { exposeGlobal } from '@pezkuwi/x-global';

exposeGlobal('fetch', fetch);
