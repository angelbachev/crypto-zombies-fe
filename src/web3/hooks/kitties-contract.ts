import Web3, { Contract } from 'web3'
import { toNumber } from 'web3-utils'
import abi from '@/web3/contracts/types/KittyFactory'
import { useState } from 'react'

export type Kitty = {
    id: string,
    isGestating: boolean,
    isReady: boolean,
    cooldownIndex: string,
    nextActionAt: string,
    siringWithId: string,
    birthTime: string,
    matronId: string,
    sireId: string,
    generation: string,
    genes: string,
}

export class CryptoKittiesContract {
    private static readonly gas = '1000000'
    private static readonly gasPrice = '10000000000'
    private readonly contract: Contract<typeof abi>

    constructor(address: string) {
        const web3 = this.createWeb3Instance()
        this.contract = this.createContract(web3, address)
    }

    private createWeb3Instance(): Web3 {
        return new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/'));
    }

    private createContract(web3: Web3, address: string) {
        return new Contract(abi, address, web3)
    }

    async getKittiesIds(): Promise<string[]> {
        return this.contract.methods.getKittiesIds().call();
    }


    async getKitty(id: string): Promise<Kitty> {
        return this.contract.methods.getKitty(id)
            .call().then(data => ({
                id,
                isGestating: data.isGestating,
                isReady: data.isReady,
                cooldownIndex: data.cooldownIndex.toString(),
                nextActionAt: data.nextActionAt.toString(),
                siringWithId: data.siringWithId.toString(),
                birthTime: data.birthTime.toString(),
                matronId: data.matronId.toString(),
                sireId: data.sireId.toString(),
                generation: data.generation.toString(),
                genes: data.genes.toString(),
            }))
    }

    async createKitty(user: string, kittyId: string, kittyGenes: string) {
        this.contract.methods.createKitty(kittyId, kittyGenes)
            .send({
                from: user,
                gas: CryptoKittiesContract.gas,
                gasPrice: CryptoKittiesContract.gasPrice,
            })
    }

    async createManyKitties(user: string, kittiesIds: string[], kittiesGenes: string[]) {
        this.contract.methods.createManyKitties(kittiesIds, kittiesGenes)
            .send({
                from: user,
                gas: CryptoKittiesContract.gas,
                gasPrice: CryptoKittiesContract.gasPrice,
            })
    }
}

export const useKittiesContract = (address: string) => {
    const [kittiesContract, setKittiesContract] = useState<CryptoKittiesContract>(new CryptoKittiesContract(address))

    return {
        kittiesContract,
        setKittiesContract
    }
}