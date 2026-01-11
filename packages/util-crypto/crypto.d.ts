import { isReady } from '@pezkuwi/wasm-crypto';
export declare const cryptoIsReady: typeof isReady;
export declare function cryptoWaitReady(): Promise<boolean>;
