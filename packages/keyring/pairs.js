import { isHex, isU8a, u8aToHex, u8aToU8a } from '@pezkuwi/util';
import { decodeAddress } from '@pezkuwi/util-crypto';
export class Pairs {
    #map = {};
    add(pair) {
        this.#map[decodeAddress(pair.address).toString()] = pair;
        return pair;
    }
    all() {
        return Object.values(this.#map);
    }
    get(address) {
        const pair = this.#map[decodeAddress(address).toString()];
        if (!pair) {
            throw new Error(`Unable to retrieve keypair '${isU8a(address) || isHex(address)
                ? u8aToHex(u8aToU8a(address))
                : address}'`);
        }
        return pair;
    }
    remove(address) {
        delete this.#map[decodeAddress(address).toString()];
    }
}
