import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  const Factory = await ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();

  const Registry = await ethers.getContractFactory("Registry");
  const registry = await Registry.deploy(await factory.getAddress());

  await (await factory.connect(owner).setRegistry(await registry.getAddress())).wait();

  console.log("factory address", await factory.getAddress(), "registry", await registry.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
