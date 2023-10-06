import contracts from "../constant/contracts";

export const getRegistry = async (publicClient: any) => {
    const data = await publicClient.readContract({
        address: contracts.factory.address as `0x${string}`,
        abi: contracts.factory.abi,
        functionName: 'registry',
    })
    return data;
}

