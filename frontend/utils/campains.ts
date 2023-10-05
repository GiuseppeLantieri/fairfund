import contracts from "../constant/contracts";

export const getRDonators = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        address: address as `0x${string}`,
        abi: contracts.campain.abi,
        functionName: 'registryDonators',
    })
    console.log(data);
}

export const getNft = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        address: address as `0x${string}`,
        abi: contracts.campain.abi,
        functionName: 'nft',
    })
    console.log(data);
}

export const getReceiver = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        address: address as `0x${string}`,
        abi: contracts.campain.abi,
        functionName: 'receiver',
    })
    console.log(data);
}

export const getNft = async (publicClient: any, address: string) => {
    const data = await publicClient.readContract({
        address: address as `0x${string}`,
        abi: contracts.campain.abi,
        functionName: 'nft',
    })
    console.log(data);
}