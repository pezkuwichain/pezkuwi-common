import { objectSpread } from '@pezkuwi/util';
import { jsonEncryptFormat } from '@pezkuwi/util-crypto';
export function pairToJson(type, { address, meta }, encoded, isEncrypted) {
    return objectSpread(jsonEncryptFormat(encoded, ['pkcs8', type], isEncrypted), {
        address,
        meta
    });
}
