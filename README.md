# Installation
In order to set up this project to work you need Node.js installed, we're currently using Node.js 20.8.0.
First open a terminal in the parent directory of the project and run:

```
npm i
```

this will install all the required packages required.

Once you're good with the requirements it's time to deploy. We used the hardhat framework so the deploy is very easy and done by the command:

```
npx hardhat run --network bitfinity-test scripts/deploy.js
```

it's possible to change the destination network (we used the bitfinity test network in the scope of this project) adding a new network in the hardhat.config.ts configuration file such as:

```
networks: {
    bitfinity-test: {
      chainId: 355113,
      url: "https://testnet.bitfinity.network",
      accounts: [PRIVATE_KEY]
    }
  }
```

