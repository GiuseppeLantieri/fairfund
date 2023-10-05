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

    return { factory, owner, otherAccount };

  }

  describe("Deployment", function () {
    it("Should deploy the correct Factory", async function () {
      const { factory, otherAccount, owner } = await loadFixture(createFactory);
      // expect(await lock.unlockTime()).to.equal(unlockTime);
      const { ONE_DAY_IN_SECS, ONE_GWEI, ONE_HOUR_IN_SECS, ONE_MINUTE_IN_SECS, ONE_YEAR_IN_SECS, lockedAmount, unlockTime } = await getCostant();


      const registry = await ethers.getContractAt("Registry", await factory.registry());

      await (await factory.connect(otherAccount).createCampain(unlockTime, ONE_GWEI, otherAccount, "Campagna WWF", "Campagna per il wwf")).wait();

      const campainAddress = (await registry.getCampains())[0];

      const campain = await ethers.getContractAt("Campain", campainAddress);
      const registryAddress = await campain.registryDonators();
      const registryDonators = await ethers.getContractAt("RegistryDonators", registryAddress);

      await (await campain.connect(otherAccount).sendFund({ value: ONE_GWEI })).wait();
      console.log(await ethers.provider.getBalance(campainAddress));
      console.log(await registryDonators.getDonators());
      console.log(await registryDonators.donators(otherAccount.address));
      console.log(await campain.budget());
      console.log(await campain.descptription());
      console.log(await campain.name());
      console.log(await campain.isPaused());
      // Transactions are sent using the first signer by default
      await time.increaseTo(unlockTime);

      await (await campain.connect(otherAccount).withdraw(["stocazzo"])).wait();
      console.log(await campain.nft());

      const nft = await ethers.getContractAt("Nft", await campain.nft());
      console.log(await nft.balanceOf(otherAccount.address));
      console.log(await nft.ownerOf(0));
      console.log(await nft.tokenURI(0));

    });
  })
})