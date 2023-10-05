# Installation & Deployment
In order to set up this project you need [Node.js](https://nodejs.org/it) installed, we're currently using Node.js 20.8.0, and [dfx](https://internetcomputer.org/docs/current/references/cli-reference/), The DFINITY command-line execution environment tool.  
  
To install `dfx` on a Linux/MacOS machine just type the command:

```
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```
If you are using a machine running Apple silicon, you will need to have Rosetta installed. You can install Rosetta by running `softwareupdate --install-rosetta` in your terminal.
There is no native support for `dfx` on Windows. However, by installing the Windows Subsystem for Linux (WSL), you can run dfx also on a Windows system as described below.

Since some currency is required to deploy a canister it is reccommended to setup a cycle wallet with some cycles in it either from the [faucet quick start](https://internetcomputer.org/docs/current/developer-docs/setup/cycles/cycles-faucet) or by purchasing ICP and following the IC [mainnet deployment](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-mainnet) guide.

Please take your time to do all this steps before proceeding further.

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
## Deploy the smart contracts on Bitfinity Network
Once you're good with the previous steps it's time to deploy the smartcontract. We used the hardhat framework so the deploy is very easy, just execute this command in the parent folder of the project:

```batch
npx hardhat run --network bitfinityTest scripts/deploy.js
```

it's possible to change the destination network (we used the bitfinity test network in the scope of this project) specifing a new network in the hardhat.config.ts configuration file such as:

```
networks: {
    bitfinity: {
      chainId: 355110,
      url: "https://mainnet.bitfinity.network",
      accounts: [PRIVATE_KEY]
    }
  }
```

Just be sure to provide the private key of a wallet with a sufficient amount of BFT or the currency token of the network you're deploying in.
### Verify the contract is correctly indexed
After the deploy take note of the **address** and **unlock time** returned in the console to check that everything is correctly indexed and working:

```
npx hardhat verify --network bitfinityTest <address> <unlock time>
```

## Deploy the Canister with the website on IC.
The deploy of the static website is pretty simple. Let's start configuring the `dfx.json` file which should be somithing like:

```
{
   "canisters": {
       "fairfounds": {
           "type": "assets",
           "source": ["assets"]
       }
   }
}
```

Just be sure to add eventual asset folders you want to include to the source configuration and change the website name.
If you're not changing the project structure the configuration file will work just fine as it is.  
The deploy is done with `dfx`:

```
dfx deploy --network playground
```

if you want to deploy the application on the mainnet change the flag in `--network ic`, or change it to `--network local` if you want to try it in local.
### Check out the website
first search the canister ID running:

```
dfx canister --network playground id fairfounds
```

As always change the flag if you deployed on a different network and take note of the returned value that should looks something like `cbopz-duaaa-aaaaa-qaaka-cai` which is the canister ID.

The website is now accessible at https://<canister-id>.icp0.io
