import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';

describe('Campaign Contract', function () {
  let Campaign;
  let campaign;
  let Nft;
  let nft;
  let RegistryDonators;
  let registryDonators;
  let owner: SignerWithAddress;
  let admin: SignerWithAddress;
  let receiver: SignerWithAddress;
  let user: SignerWithAddress;

  before(async function () {
    [owner, admin, receiver, user] = await ethers.getSigners();
    Campaign = await ethers.getContractFactory('Campain');
    Nft = await ethers.getContractFactory('Nft');
    RegistryDonators = await ethers.getContractFactory('RegistryDonators');
  });

  beforeEach(async function () {
    // Deploy Nft and RegistryDonators contracts
    nft = await Nft.connect(owner).deploy('NFTName', 'NFT');
    await nft.deployed();

    registryDonators = await RegistryDonators.connect(owner).deploy();
    await registryDonators.deployed();

    // Deploy Campaign contract and link it to Nft and RegistryDonators
    campaign = await Campaign.connect(owner).deploy(
      Math.floor(Date.now() / 1000) + 3600, // Unlock time 1 hour in the future
      admin.address,
      receiver.address,
      'CampaignName',
      'CMP'
    );
    await campaign.deployed();

    await campaign.connect(owner).setNftAddress(nft.address);
    await campaign.connect(owner).setRegistryDonators(registryDonators.address);
  });

  it('should deploy with the correct parameters', async function () {
    expect(await campaign.unlockTime()).to.equal(Math.floor(Date.now() / 1000) + 3600);
    expect(await campaign.admin()).to.equal(admin.address);
    expect(await campaign.receiver()).to.equal(receiver.address);
    expect(await campaign.name()).to.equal('CampaignName');
    expect(await campaign.symbol()).to.equal('CMP');
    expect(await campaign.isPaused()).to.equal(false);
  });

  it('should allow the admin to pause the campaign', async function () {
    await campaign.connect(admin).setPause(true);
    expect(await campaign.isPaused()).to.equal(true);
  });

  it('should not allow non-admin to pause the campaign', async function () {
    await expect(campaign.connect(user).setPause(true)).to.be.revertedWith(
      'Only the admin can pause the campaign'
    );
  });

  it('should not allow non-admin to withdraw funds', async function () {
    await expect(campaign.connect(user).withdraw(['uri1'])).to.be.revertedWith(
      'Only the receiver can withdraw'
    );
  });

  it('should not allow withdrawal before the unlock time', async function () {
    await expect(campaign.withdraw(['uri1'])).to.be.revertedWith("You can't withdraw yet");
  });

  it('should allow the receiver to withdraw funds and create NFTs for donators', async function () {
    // Send some funds to the contract from user
    const donationAmount = ethers.utils.parseEther('1.0');
    await campaign.connect(user).sendTransaction({ value: donationAmount });

    // Increase the block time to simulate waiting until unlock time
    await ethers.provider.send('evm_increaseTime', [3601]); // 1 hour and 1 second

    const receiverBalanceBefore = await ethers.provider.getBalance(receiver.address);

    // Withdraw funds
    await campaign.connect(receiver).withdraw(['uri1', 'uri2', 'uri3']);

    const receiverBalanceAfter = await ethers.provider.getBalance(receiver.address);

    // Check if receiver received the correct amount of funds
    expect(receiverBalanceAfter.sub(receiverBalanceBefore)).to.equal(donationAmount);

    // Check if NFTs were created for the donators
    expect(await nft.balanceOf(user.address)).to.equal(3);
  });
});
