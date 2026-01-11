"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = inherits;
function inherits(child, parent) {
    if (parent) {
        child.super_ = parent;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        child.prototype = Object.create(parent.prototype, {
            constructor: {
                configurable: true,
                enumerable: false,
                value: child,
                writable: true
            }
        });
    }
}
