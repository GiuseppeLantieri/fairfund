import contracts from "../constant/contracts";

export const getCampains = async (publicClient: any) => {
    const data = await publicClient.readContract({
        address: contracts.registry.address as `0x${string}`,
        abi: contracts.registry.abi,
        functionName: 'getCampains',
    })
    console.log(data);
}
