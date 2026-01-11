import { knownGenesis, knownIcon, knownLedger, knownTestnet } from './defaults/index.js';
const UNSORTED = [0, 2, 42];
const TESTNETS = ['testnet'];
const customNetworks = [
    {
        decimals: [10],
        displayName: 'Pezkuwi Relay Chain',
        network: 'pezkuwi',
        prefix: 0,
        standardAccount: '*25519',
        symbols: ['PZW'],
        website: 'https://pezkuwi.com'
    },
    {
        decimals: [12],
        displayName: 'Zagros Relay Chain',
        network: 'zagros',
        prefix: 2,
        standardAccount: '*25519',
        symbols: ['ZGS'],
        website: 'https://zagros.pezkuwi.com'
    },
    {
        decimals: [12],
        displayName: 'Bizinikiwi',
        network: 'bizinikiwi',
        prefix: 42,
        standardAccount: '*25519',
        symbols: ['BZN'],
        website: 'https://bizinikiwi.com'
    },
    {
        decimals: [18],
        displayName: 'PezkuwiChain',
        network: 'pezkuwichain',
        prefix: 1453,
        standardAccount: '*25519',
        symbols: ['PZC'],
        website: 'https://chain.pezkuwi.com'
    }
];
function toExpanded(o) {
    const network = o.network || '';
    const nameParts = network.replace(/_/g, '-').split('-');
    const n = o;
    // ledger additions
    n.slip44 = knownLedger[network];
    n.hasLedgerSupport = !!n.slip44;
    // general items
    n.genesisHash = knownGenesis[network] || [];
    n.icon = knownIcon[network] || 'substrate';
    // filtering
    n.isTestnet = !!knownTestnet[network] || TESTNETS.includes(nameParts[nameParts.length - 1]);
    n.isIgnored = n.isTestnet || (!(o.standardAccount &&
        o.decimals?.length &&
        o.symbols?.length) &&
        o.prefix !== 42);
    return n;
}
function filterSelectable({ genesisHash, prefix }) {
    return !!genesisHash.length || prefix === 42;
}
function filterAvailable(n) {
    return !n.isIgnored && !!n.network;
}
function sortNetworks(a, b) {
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
export const allNetworks = customNetworks.map(toExpanded);
export const availableNetworks = allNetworks.filter(filterAvailable).sort(sortNetworks);
export const selectableNetworks = availableNetworks.filter(filterSelectable);
