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

export const getDonatorAmount = async (publicClient: any, address: string, donator: string) => {
    const data = await publicClient.readContract({
        ...getContract(address),
        functionName: 'donators',
        args: [donator]
    })
    return data;
}