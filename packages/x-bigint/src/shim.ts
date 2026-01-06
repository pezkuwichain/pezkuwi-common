// Copyright 2017-2025 @pezkuwi/x-bigint authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BigInt } from '@pezkuwi/x-bigint';
import { exposeGlobal } from '@pezkuwi/x-global';

exposeGlobal('BigInt', BigInt);
