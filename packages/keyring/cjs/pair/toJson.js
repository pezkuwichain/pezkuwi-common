"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairToJson = pairToJson;
const util_1 = require("@pezkuwi/util");
const util_crypto_1 = require("@pezkuwi/util-crypto");
function pairToJson(type, { address, meta }, encoded, isEncrypted) {
    return (0, util_1.objectSpread)((0, util_crypto_1.jsonEncryptFormat)(encoded, ['pkcs8', type], isEncrypted), {
        address,
        meta
    });
}
