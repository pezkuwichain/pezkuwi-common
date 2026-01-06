// Copyright 2017-2025 @pezkuwi/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { exposeGlobal } from '@pezkuwi/x-global';
import { crypto } from '@pezkuwi/x-randomvalues';

exposeGlobal('crypto', crypto);
