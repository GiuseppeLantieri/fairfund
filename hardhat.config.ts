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
      accounts: [PRIVATE_KEY],
      chainId: 355113,
    }
  }
};

export default config;
