import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";

describe("FactoryCampaign", async () => {
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

      await (await factory.connect(otherAccount).createCampaign(
        unlockTime,
        ONE_GWEI,
        otherAccount,
        "Campagna WWF",
        "https:",
        "WWF",
        "Africa",
        "22100",
        "Campagna per il wwf"
      )).wait();

      const campaignAddress = (await registry.getCampaigns())[0];

      const campaign = await ethers.getContractAt("Campaign", campaignAddress);
      const registryAddress = await campaign.registryDonators();
      const registryDonators = await ethers.getContractAt("RegistryDonators", registryAddress);

      await (await campaign.connect(otherAccount).sendFund({ value: ONE_GWEI })).wait();
      console.log("balance capaign",await ethers.provider.getBalance(campaignAddress));
      console.log("donators",await registryDonators.getDonators());
      console.log("amount donatated",await registryDonators.donators(otherAccount.address));
      console.log("budget",await campaign.budget());
      console.log("description",await campaign.description());
      console.log("name",await campaign.name());
      console.log("isPaused",await campaign.isPaused());
      // Time skipping
      // await time.increaseTo(unlockTime);

      console.log("nft address before",await campaign.nft());
      await (await campaign.connect(otherAccount).withdraw(["https://"])).wait();
      console.log("nft address after",await campaign.nft());

      const nft = await ethers.getContractAt("Nft", await campaign.nft());
      console.log("nft balance",await nft.balanceOf(otherAccount.address));
      console.log("nft owner",await nft.ownerOf(0));
      console.log("token uri",await nft.tokenURI(0));
      await (await campaign.connect(otherAccount).sendFund({ value: ONE_GWEI })).wait();
      console.log("balance of campaign 0 because send direct to receiver now",await ethers.provider.getBalance(campaignAddress));


    });
  })
})