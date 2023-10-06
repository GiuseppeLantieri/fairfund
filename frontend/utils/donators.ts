import contracts from "../constant/contracts";

export const getContract = (address: string) => ({
    address: address as `0x${string}`,
    abi: contracts.rDonators.abi,
})

export const getDonators = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'getDonators',
    })
    return data;
}

export const getDonatorsLength = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'getDonatorsLength',
    })
    return data;
}

export const getEverythingCampaign = async (publicClient: any, address: string) => {
    const data = await publicClient.multicall({
        contracts: [
            {
                ...getContract(address),
                functionName: 'getDonatorsLength',
            },
            {
                ...getContract(address),
                functionName: 'getDonators',
            }
        ]
    });
    return data;
}