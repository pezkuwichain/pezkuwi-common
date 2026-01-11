/**
 * @name isString
 * @summary Tests for a string.
 * @description
 * Checks to see if the input value is a JavaScript string.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isString } from '@pezkuwi/util';
 *
 * console.log('isString', isString('test')); // => true
 * ```
 */
export function isString(value) {
    return typeof value === 'string' || value instanceof String;
}
