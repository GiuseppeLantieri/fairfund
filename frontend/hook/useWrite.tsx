import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"

interface Detail {
    address: string,
    abi: {}[],
    args: {}[] | undefined,
    enabled: boolean,
    value: bigint,
    functionName: string
}

export function useWrite(detail: Detail) {
    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: detail.address as `0x${string}`,
        abi: detail.abi,
        functionName: detail.functionName,
        args: detail.args,
        enabled: detail.enabled,
        value: detail.value
    })
    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return { prepareError, isPrepareError, error, isError, write, isLoading, isSuccess, data }
}