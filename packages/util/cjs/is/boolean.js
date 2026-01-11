"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBoolean = isBoolean;
/**
 * @name isBoolean
 * @summary Tests for a boolean value.
 * @description
 * Checks to see if the input value is a JavaScript boolean.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isBoolean } from '@pezkuwi/util';
 *
 * isBoolean(false); // => true
 * ```
 */
function isBoolean(value) {
    return typeof value === 'boolean';
}
