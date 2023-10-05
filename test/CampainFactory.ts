import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Campain, RegistryDonators } from "../typechain-types";

describe("FactoryCampain", async () => {
  async function getCostant() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_MINUTE_IN_SECS = 60;
    const ONE_HOUR_IN_SECS = 60 * 60;
    const ONE_DAY_IN_SECS = 24 * 60 * 60;

    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    return { ONE_YEAR_IN_SECS, ONE_DAY_IN_SECS, ONE_HOUR_IN_SECS, ONE_MINUTE_IN_SECS, ONE_GWEI, lockedAmount, unlockTime }
  }

  async function createFactory() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("Factory");
    const factory = await Factory.deploy();

    const Registry = await ethers.getContractFactory("Registry");
    const registry = await Registry.deploy(await factory.getAddress());

    await (await factory.connect(owner).setRegistry(await registry.getAddress())).wait();

    return { factory, registry, owner, otherAccount };

  }

  describe("Deployment", function () {
    it("Should deploy the correct Factory", async function () {
      const { factory, registry, otherAccount, owner } = await loadFixture(createFactory);
      // expect(await lock.unlockTime()).to.equal(unlockTime);
      const { ONE_DAY_IN_SECS, ONE_GWEI, ONE_HOUR_IN_SECS, ONE_MINUTE_IN_SECS, ONE_YEAR_IN_SECS, lockedAmount, unlockTime } = await getCostant();

      /* 
      uint _unlockTime,
      address _receiver,
      string memory _name,
      string memory _symbol 
      */
      await (await factory.connect(otherAccount).createCampain(unlockTime, otherAccount, "Campagna WWF", "WWF")).wait();

      const campainAddress = (await registry.getCampains())[0];

      const campain = await ethers.getContractAt("Campain", campainAddress);
      const registryAddress = await campain.registryDonators();
      const registryDonators = await ethers.getContractAt("RegistryDonators", registryAddress);

      await (await campain.connect(otherAccount).sendFund({ value: ONE_GWEI })).wait();
      console.log(await ethers.provider.getBalance(campainAddress));
      console.log(await registryDonators.getDonators());


    });
  })
})