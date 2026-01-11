"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefs = createDefs;
function createDefs(...items) {
    return items.map(([type, Clazz]) => ({
        create: () => Clazz.create(),
        type
    }));
}
