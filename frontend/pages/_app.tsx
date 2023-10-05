import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { bitfinity, publicRpcBitfinity } from '../constant/chain';
import 'bootstrap/dist/css/bootstrap.min.css';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    bitfinity,
  ],
  [jsonRpcProvider({
    rpc: () => { return { http: publicRpcBitfinity } }
  })]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'fba6cc32b332f823aefbde779eb39050',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps}  />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
