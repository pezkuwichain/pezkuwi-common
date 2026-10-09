// Copyright 2017-2026 @pezkuwi/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name isUndefined
 * @summary Tests for a `undefined` values.
 * @description
 * Checks to see if the input value is `undefined`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isUndefined } from '@pezkuwi/util';
 *
 * console.log('isUndefined', isUndefined(void(0))); // => true
 * ```
 */
export function isUndefined (value?: unknown): value is undefined {
  return value === undefined;
}
