import contracts from "../constant/contracts";

export const getContract = (address: string) => ({
    address: address as `0x${string}`,
    abi: contracts.campaign.abi,
})

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

export const getEverythingCampaign = async (publicClient: any, address: string) => {
    const data = await publicClient.multicall({
        contracts: [
            {
                ...getContract(address),
                functionName: 'registryDonators',
            },
            {
                ...getContract(address),
                functionName: 'nft',
            },
            {
                ...getContract(address),
                functionName: 'receiver'
            }
            ,
            {
                ...getContract(address),
                functionName: 'budget'
            },
            {
                ...getContract(address),
                functionName: 'fundRaised',
            },
            {
                ...getContract(address),
                functionName: 'name',
            },
            {
                ...getContract(address),
                functionName: 'description',
            }
        ]
    });
    return data;
}