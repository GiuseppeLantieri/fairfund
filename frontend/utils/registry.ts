import contracts from "../constant/contracts";

export const getCampaigns = async (publicClient: any) => {
    const data = await publicClient.readContract({
        address: contracts.registry.address as `0x${string}`,
        abi: contracts.registry.abi,
        functionName: 'getCampaigns',
    })
    return data;
}
