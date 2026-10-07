// Copyright 2017-2026 @pezkuwi/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BizinikwiNetwork, KnownBizinikiwi, Network } from './types.js';

import { knownGenesis, knownIcon, knownLedger, knownTestnet } from './defaults/index.js';

// Prefixes kept in their declared order at the head of the list
const UNSORTED = [42];
const TESTNETS = ['testnet'];

const customNetworks: KnownBizinikiwi[] = [
  // The Pezkuwi chains encode addresses with the generic prefix 42, the format
  // their nodes report (system_properties: ss58Format 42, HEZ, 12 decimals).
  {
    decimals: [12],
    displayName: 'Pezkuwi Relay Chain',
    network: 'pezkuwi',
    prefix: 42,
    standardAccount: '*25519',
    symbols: ['HEZ'],
    website: 'https://pezkuwichain.io'
  },
  {
    decimals: [12],
    displayName: 'Zagros Relay Chain',
    network: 'zagros',
    prefix: 42,
    standardAccount: '*25519',
    symbols: ['HEZ'],
    website: 'https://zagros.pezkuwichain.io'
  },
  {
    decimals: [12],
    displayName: 'Bizinikiwi',
    network: 'bizinikiwi',
    prefix: 42,
    standardAccount: '*25519',
    symbols: ['BZN'],
    website: 'https://bizinikiwi.pezkuwichain.io'
  }
];

function toExpanded (o: KnownBizinikiwi): BizinikwiNetwork {
  const network = o.network || '';
  const nameParts = network.replace(/_/g, '-').split('-');
  const n = o as BizinikwiNetwork;

  // ledger additions
  n.slip44 = knownLedger[network];
  n.hasLedgerSupport = !!n.slip44;

  // general items
  n.genesisHash = knownGenesis[network] || [];
  n.icon = knownIcon[network] || 'substrate';

  // filtering
  n.isTestnet = !!knownTestnet[network] || TESTNETS.includes(nameParts[nameParts.length - 1]);
  n.isIgnored = n.isTestnet || (
    !(
      o.standardAccount &&
      o.decimals?.length &&
      o.symbols?.length
    ) &&
    o.prefix !== 42
  );

  return n;
}

function filterSelectable ({ genesisHash, prefix }: Network): boolean {
  return !!genesisHash.length || prefix === 42;
}

function filterAvailable (n: BizinikwiNetwork): n is Network {
  return !n.isIgnored && !!n.network;
}

function sortNetworks (a: Network, b: Network): number {
  const isUnSortedA = UNSORTED.includes(a.prefix);
  const isUnSortedB = UNSORTED.includes(b.prefix);

  return isUnSortedA === isUnSortedB
    ? isUnSortedA
      ? 0
      : a.displayName.localeCompare(b.displayName)
    : isUnSortedA
      ? -1
      : 1;
}

// This is all the Bizinikiwi networks with our additional information
export const allNetworks = customNetworks.map(toExpanded);

// The list of available/claimed prefixes
//   - no testnets
//   - we only include those where we have a standardAccount
//   - sort by name, however we keep 0, 2, 42 first in the list
export const availableNetworks = allNetworks.filter(filterAvailable).sort(sortNetworks);

// A filtered list of those chains we have details about (genesisHashes)
export const selectableNetworks = availableNetworks.filter(filterSelectable);
