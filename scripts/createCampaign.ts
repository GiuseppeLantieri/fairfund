import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();

    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const factory = await ethers.getContractAt("Factory", "0xcEf8495d139bFf975Ac50a03E723028fe1c5FcAD");
    const registry = await ethers.getContractAt("Registry", await factory.registry());
    const ONE_GWEI = 1_000_000_000;

    const unlockTime = Math.round((new Date().getTime() / 1000)) + ONE_YEAR_IN_SECS;
    await (await factory.connect(owner).createCampaign(
        unlockTime,
        ONE_GWEI,
        owner,
        "Campagna WWF",
        "https:",
        "WWF",
        "Africa",
        "22100",
        "Campagna per il wwf"
    )).wait();

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
