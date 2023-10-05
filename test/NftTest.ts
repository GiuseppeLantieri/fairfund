import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';

describe('Nft Contract', function () {
  let Nft;
  let nft;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  const URI = 'https://example.com/token/1';

  before(async function () {
    [owner, user] = await ethers.getSigners();
    Nft = await ethers.getContractFactory('Nft');
  });

  beforeEach(async function () {
    nft = await Nft.connect(owner).deploy('NFTName', 'NFT');
    await nft.deployed();
  });

  it('should deploy with the correct name and symbol', async function () {
    expect(await nft.name()).to.equal('NFTName');
    expect(await nft.symbol()).to.equal('NFT');
  });

  it('should allow the owner to safely mint tokens', async function () {
    const tokenId = await nft.getNextTokenId();

    await nft.connect(owner).safeMint(user.address, URI);

    expect(await nft.ownerOf(tokenId)).to.equal(user.address);
    expect(await nft.tokenURI(tokenId)).to.equal(URI);
  });

  it('should only allow the owner to safely mint tokens', async function () {
    await expect(nft.connect(user).safeMint(user.address, URI)).to.be.revertedWith(
      'Ownable: caller is not the owner'
    );
  });

  it('should increment the tokenId with each mint', async function () {
    const tokenId1 = await nft.getNextTokenId();
    await nft.connect(owner).safeMint(user.address, URI);
    const tokenId2 = await nft.getNextTokenId();
    await nft.connect(owner).safeMint(user.address, URI);

    expect(tokenId2).to.equal(tokenId1.add(1));
  });

  it('should allow querying token URIs', async function () {
    const tokenId = await nft.getNextTokenId();
    await nft.connect(owner).safeMint(user.address, URI);

    expect(await nft.tokenURI(tokenId)).to.equal(URI);
  });

  it('should support ERC721 interfaces', async function () {
    expect(await nft.supportsInterface('0x80ac58cd')).to.equal(true); // ERC721
    expect(await nft.supportsInterface('0x5b5e139f')).to.equal(true); // ERC721URIStorage
  });
});
