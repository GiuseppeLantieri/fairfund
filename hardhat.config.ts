import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    }
  },
  networks: {
    testnet_bitfinity: {
      url: 'https://testnet.bitfinity.network',
      accounts: ["0591e149cab6d9ab1d5e393749ef7d41a366b89ce655b36074eddddbed19153a"],
      chainId: 355113,
    }
  }
};

export default config;
