# @pezkuwi/common

Common utilities, cryptographic functions, and keyring management for PezkuwiChain applications.

**Developed by Dijital Kurdistan Tech Institute**

## Overview

This repository provides utility functions with additional safety checks, allowing for consistent coding and reducing boilerplate across all [@pezkuwi](https://github.com/pezkuwichain) packages.

## Packages

| Package | Description |
|---------|-------------|
| [@pezkuwi/keyring](packages/keyring/) | Keyring management for accounts |
| [@pezkuwi/util](packages/util/) | General utility functions |
| [@pezkuwi/util-crypto](packages/util-crypto/) | Cryptographic and hashing utilities |
| [@pezkuwi/networks](packages/networks/) | Network definitions |
| [@pezkuwi/x-bigint](packages/x-bigint/) | BigInt polyfills |
| [@pezkuwi/x-fetch](packages/x-fetch/) | Fetch polyfills |
| [@pezkuwi/x-global](packages/x-global/) | Global object utilities |
| [@pezkuwi/x-randomvalues](packages/x-randomvalues/) | Random values polyfills |
| [@pezkuwi/x-textdecoder](packages/x-textdecoder/) | TextDecoder polyfills |
| [@pezkuwi/x-textencoder](packages/x-textencoder/) | TextEncoder polyfills |
| [@pezkuwi/x-ws](packages/x-ws/) | WebSocket polyfills |

## Installation

```bash
# Keyring
npm install @pezkuwi/keyring

# Utilities
npm install @pezkuwi/util

# Crypto utilities
npm install @pezkuwi/util-crypto
```

## Quick Start

```javascript
import { Keyring } from '@pezkuwi/keyring';
import { hexToU8a, u8aToHex } from '@pezkuwi/util';
import { mnemonicGenerate, blake2AsHex } from '@pezkuwi/util-crypto';

// Generate a mnemonic
const mnemonic = mnemonicGenerate();

// Create a keyring and add account
const keyring = new Keyring({ type: 'sr25519' });
const pair = keyring.addFromMnemonic(mnemonic);

console.log(`Address: ${pair.address}`);
```

## Development

### Prerequisites

- Node.js >= 18.14
- Yarn 4.x (via corepack)

### Building

```bash
git clone https://github.com/pezkuwichain/pezkuwi-common
cd pezkuwi-common
corepack enable
yarn install
yarn build
```

## Tutorials

Looking for tutorials? Check out [examples](https://js.pezkuwichain.app/docs/keyring/) for guides on how to use these utilities.

## Links

- Website: https://pezkuwichain.io
- Documentation: https://docs.pezkuwichain.io
- API Docs: https://js.pezkuwichain.app
- GitHub: https://github.com/pezkuwichain

## License

Apache-2.0

## Author

Dijital Kurdistan Tech Institute
