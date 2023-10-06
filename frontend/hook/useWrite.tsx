import * as React from 'react'
import { Abi } from 'viem'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'

interface ContractArgs {
    address: `0x${string}`,
    abi: any,
    functionName: string,
    args: any[],
    enabled: boolean,

}

export function useWrite(contractArgs: ContractArgs) {
    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite(contractArgs)
    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return {
        isLoading, isSuccess, prepareError, isPrepareError, error, isError, write
    }
}
