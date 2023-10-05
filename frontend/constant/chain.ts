import { defineChain } from 'viem'

export const publicRpcBitfinity = "https://testnet.bitfinity.network/";

export const bitfinity = defineChain({
    id: 355113,
    name: 'Bitfinity TestNet',
    network: 'bitfinity',
    nativeCurrency: {
        decimals: 18,
        name: 'Bitfinity Token',
        symbol: 'BFT',
    },
    rpcUrls: {
        default: {
            http: [publicRpcBitfinity],
        },
        public: {
            http: [publicRpcBitfinity],
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: '' },
    },
    contracts: {
    },
})