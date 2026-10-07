// Copyright 2017-2026 @pezkuwi/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@pezkuwi/dev-test/globals.d.ts" />

import { knownGenesis, knownIcon, knownLedger, knownTestnet } from './defaults/index.js';
import { allNetworks, availableNetworks, selectableNetworks } from './index.js';

describe('availableNetworks', (): void => {
  it('lists the Pezkuwi networks first, in their declared order', (): void => {
    expect(availableNetworks.map(({ network }) => network)).toEqual(['pezkuwi', 'zagros', 'bizinikiwi']);
  });

  it('has no ignored networks', (): void => {
    expect(availableNetworks.some(({ isIgnored }) => isIgnored)).toEqual(false);
  });

  it('has no reserved networks', (): void => {
    expect(availableNetworks.some(({ prefix }) => prefix === 47)).toEqual(false);
  });

  it('has allNetworks genesis information', (): void => {
    expect(
      Object.entries(knownGenesis).filter(([network, genesisHash]) =>
        availableNetworks.some((a) =>
          a.network === network &&
          genesisHash.some((g, index) => a.genesisHash[index] !== g)
        )
      )
    ).toEqual([]);
  });

  it('has allNetworks ledger details', (): void => {
    expect(
      Object.entries(knownLedger).filter(([network, slip44]) =>
        availableNetworks.some((a) =>
          a.network === network && (
            a.slip44 !== slip44 ||
            !a.hasLedgerSupport ||
            !a.genesisHash.length
          )
        )
      )
    ).toEqual([]);
  });

  it('has no testnets exposed', (): void => {
    expect(
      Object.keys(knownTestnet).filter((network) =>
        availableNetworks.some((a) =>
          a.network === network
        )
      )
    ).toEqual([]);
  });

  it('has allNetworks icons, except for overrides', (): void => {
    expect(
      availableNetworks.filter(({ icon, network }) =>
        icon !== 'substrate' &&
        knownIcon[network] !== icon
      )
    ).toEqual([]);
  });

  // What the nodes report (system_properties) and what a wallet formats
  // addresses with must agree: ss58Format 42, HEZ, 12 decimals.
  it('gives the Pezkuwi chains the format their nodes report', (): void => {
    for (const network of ['pezkuwi', 'zagros']) {
      const n = availableNetworks.find((a) => a.network === network);

      expect(n && { decimals: n.decimals, prefix: n.prefix, symbols: n.symbols }).toEqual({
        decimals: [12],
        prefix: 42,
        symbols: ['HEZ']
      });
    }
  });

  it('knows Zagros by its genesis, and not the mainnet while it is relaunched', (): void => {
    expect(availableNetworks.find((a) => a.network === 'zagros')?.genesisHash).toEqual([
      '0x1b0b4727bbb5e44ed587d1056b4ad537ffb330034509a58866a088d77e792cd5'
    ]);
    expect(availableNetworks.find((a) => a.network === 'pezkuwi')?.genesisHash).toEqual([]);
  });
});

describe('allNetworks', (): void => {
  // Upstream's registry gives every prefix to one network. The Pezkuwi chains
  // share the generic format 42 by design; any other prefix stays unique.
  it('shares an ss58 prefix only at 42', (): void => {
    const seen = new Map<number, string[]>();

    allNetworks.forEach(({ network, prefix }): void => {
      seen.set(prefix, [...(seen.get(prefix) || []), network]);
    });

    expect([...seen.entries()].filter(([prefix, networks]) => prefix !== 42 && networks.length > 1)).toEqual([]);
  });

  it('has no two networks claiming one genesis', (): void => {
    const hashes = allNetworks.flatMap(({ genesisHash }) => genesisHash);

    expect(hashes.length).toEqual(new Set(hashes).size);
  });
});

describe('selectableNetworks', (): void => {
  // selectable = has a genesis, or uses the generic format 42; every Pezkuwi
  // network uses 42, so the mainnet stays selectable while it has no genesis
  it('offers every Pezkuwi network', (): void => {
    expect(selectableNetworks.map(({ network }) => network)).toEqual(['pezkuwi', 'zagros', 'bizinikiwi']);
  });
});
