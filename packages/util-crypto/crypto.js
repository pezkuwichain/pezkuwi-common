import { isReady, waitReady } from '@pezkuwi/wasm-crypto';
export const cryptoIsReady = isReady;
export function cryptoWaitReady() {
    return waitReady()
        .then(() => {
        if (!isReady()) {
            throw new Error('Unable to initialize @pezkuwi/util-crypto');
        }
        return true;
    })
        .catch(() => false);
}
