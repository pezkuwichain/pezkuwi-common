import { u8aConcat } from '@pezkuwi/util';
export function sr25519KeypairToU8a({ publicKey, secretKey }) {
    return u8aConcat(secretKey, publicKey).slice();
}
