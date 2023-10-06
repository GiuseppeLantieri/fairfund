import contracts from "../constant/contracts";
import { formatUnits } from 'viem';

export const getContract = (address: string) => ({
    address: address as `0x${string}`,
    abi: contracts.campaign.abi,
})

export const getunlockTime = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'unlockTime',
    })
    return data;
}

export const getRDonators = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'registryDonators',
    })
    return data;
}

export const getNft = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'nft',
    })
    return data;
}

export const getReceiver = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'receiver',
    })
    return data;
}

export const getBudget = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'budget',
    })
    return data;
}

export const getFundRaiser = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'fundRaised',
    })
    return data;
}

export const getName = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'name',
    })
    return data;
}

export const getDescription = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'description',
    })
    return data;
}

export const getImage = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'image',
    })
    return data;
}

export const getCompany = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'company',
    })
    return data;
}

export const getLocation = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'location',
    })
    return data;
}

export const getPostal = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'postal',
    })
    return data;
}

export const getEverythingCampaign = async (publicClient: any, address: string) => {
    const rDonators = await getRDonators(publicClient, address);
    const name = await getName(publicClient, address);
    const description = await getDescription(publicClient, address);
    const image = await getImage(publicClient, address);
    const budget = await getBudget(publicClient, address);
    const company = await getCompany(publicClient, address);
    const location = await getLocation(publicClient, address);
    const postal = await getPostal(publicClient, address);
    const receiver = await getReceiver(publicClient, address);
    const fundRaised = await getFundRaiser(publicClient, address);
    const Nft = await getNft(publicClient, address);
    const unlockTime = await getunlockTime(publicClient, address);

    return {
        address,
        unlockTime:formatUnits(unlockTime,0),
        rDonators,
        name,
        description,
        image: image.replace("ipfs://", "https://ipfs.io/ipfs/"),
        budget: formatUnits(budget, 18),
        company,
        location,
        postal,
        receiver,
        fundRaised: formatUnits(fundRaised, 18),
        Nft
    }
}