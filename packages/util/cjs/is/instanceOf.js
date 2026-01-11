"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInstanceOf = isInstanceOf;
/**
 * @name isInstanceOf
 * @summary Tests for a instance of a class.
 * @description
 * Checks to see if the input value is an instance of the test class.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isInstanceOf } from '@pezkuwi/util';
 *
 * console.log('isInstanceOf', isInstanceOf(new Array(0), Array)); // => true
 * ```
 */
function isInstanceOf(value, Clazz) {
    return (((value && value.constructor) === Clazz) ||
        value instanceof Clazz);
}
