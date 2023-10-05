# Installation
In order to set up this project to work you need Node.js installed, we're currently using Node.js 20.8.0.
## Installing requirements
First open a terminal in the parent directory of the project and run:

```batch
npm i
```

this will install all the required packages required.
## Setting local environment variables
create a file in the parent directory called **.env** and put your wallet private key inside as follow:

```
PRIVATE_KEY="<private-key>"
```
## Deployment
Once you're good with the previous steps it's time to deploy. We used the hardhat framework so the deploy is very easy and done by the comman, just execute the command in the parent folder of the project:

```batch
npx hardhat run --network bitfinityTest scripts/deploy.js
```

it's possible to change the destination network (we used the bitfinity test network in the scope of this project) adding a new network in the hardhat.config.ts configuration file such as:

```
networks: {
    bitfinity: {
      chainId: 355110,
      url: "https://mainnet.bitfinity.network",
      accounts: [PRIVATE_KEY]
    }
  }
```

Just be sure to provide the right private key.
## Verify the contract is correctly indexed
After the deploy take note of the **address** and **unlock time** returned in the console to check that everything is correctly indexed and working:

```
npx hardhat verify --network bitfinityTest <address> <unlock time>
```
