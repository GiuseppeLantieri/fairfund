import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';

describe('RegistryDonators Contract', function () {
  let RegistryDonators;
  let registryDonators;
  let Campaign;
  let campaign;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  before(async function () {
    [owner, user] = await ethers.getSigners();
    RegistryDonators = await ethers.getContractFactory('RegistryDonators');
    Campaign = await ethers.getContractFactory('Campaign'); // Assuming you have a Campaign contract
  });

  beforeEach(async function () {
    campaign = await Campaign.connect(owner).deploy(user.address); // Deploy Campaign with user as the owner
    await campaign.deployed();

    registryDonators = await RegistryDonators.connect(owner).deploy(campaign.address);
    await registryDonators.deployed();
  });

  it('should deploy with the correct campaign address', async function () {
    expect(await registryDonators.campaign()).to.equal(campaign.address);
  });

  it('should allow the campaign to add donators', async function () {
    const donationAmount = ethers.utils.parseEther('1.0');

    await campaign.connect(user).sendFunds({ value: donationAmount });

    await registryDonators.connect(campaign).addDonators(user.address, donationAmount);

    const donatorsList = await registryDonators.getDonators();
    expect(donatorsList.length).to.equal(1);
    expect(donatorsList[0]).to.equal(user.address);
    expect(await registryDonators.donators(user.address)).to.equal(donationAmount);
  });

  it('should not allow non-campaign to add donators', async function () {
    await expect(registryDonators.connect(user).addDonators(user.address, 100)).to.be.revertedWith(
      'You are not my Campaign'
    );
  });

  it('should get the number of donators', async function () {
    const donationAmount1 = ethers.utils.parseEther('1.0');
    const donationAmount2 = ethers.utils.parseEther('2.0');

    await campaign.connect(user).sendFunds({ value: donationAmount1 });
    await campaign.connect(user).sendFunds({ value: donationAmount2 });

    await registryDonators.connect(campaign).addDonators(user.address, donationAmount1);
    await registryDonators.connect(campaign).addDonators(user.address, donationAmount2);

    const donatorsLength = await registryDonators.getDonatorsLength();
    expect(donatorsLength).to.equal(2);
  });
});
