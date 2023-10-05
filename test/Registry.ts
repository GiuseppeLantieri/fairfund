import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';

describe('Registry Contract', function () {
  let Registry;
  let registry;
  let Factory;
  let factory;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  before(async function () {
    [owner, user] = await ethers.getSigners();
    Registry = await ethers.getContractFactory('Registry');
    Factory = await ethers.getContractFactory('Factory'); // Assuming you have a Factory contract
  });

  beforeEach(async function () {
    factory = await Factory.connect(owner).deploy();
    await factory.deployed();

    registry = await Registry.connect(owner).deploy(factory.address);
    await registry.deployed();
  });

  it('should deploy with the correct factory address', async function () {
    expect(await registry.factory()).to.equal(factory.address);
  });

  it('should allow the factory to add a campaign', async function () {
    await factory.connect(owner).createCampaign();
    const campaignAddress = await factory.campaigns(0);

    await registry.connect(factory).addCampain(campaignAddress);

    const campainsList = await registry.getCampains();
    expect(campainsList.length).to.equal(1);
    expect(campainsList[0]).to.equal(campaignAddress);
  });

  it('should not allow non-factory to add a campaign', async function () {
    await expect(registry.connect(user).addCampain(user.address)).to.be.revertedWith(
      'You are not my factory'
    );
  });
});
