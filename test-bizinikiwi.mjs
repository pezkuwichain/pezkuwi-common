import { cryptoWaitReady, sr25519PairFromSeed, sr25519Sign, sr25519Verify, mnemonicToMiniSecret } from '@pezkuwi/util-crypto';
import { hexToU8a, u8aToHex } from '@pezkuwi/util';

await cryptoWaitReady();

const mnemonic = 'crucial surge north silly divert throw habit fury zebra fabric tank output';
const seed = mnemonicToMiniSecret(mnemonic);
const pair = sr25519PairFromSeed(seed);

console.log('Public key:', u8aToHex(pair.publicKey));

const message = new TextEncoder().encode('test message');
const signature = sr25519Sign(message, pair);
console.log('Signature:', u8aToHex(signature).slice(0, 40) + '...');

const verified = sr25519Verify(message, signature, pair.publicKey);
console.log('Verified:', verified);
