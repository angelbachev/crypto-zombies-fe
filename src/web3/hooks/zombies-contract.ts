import Web3, { Contract, TransactionReceipt } from 'web3'
import { toNumber } from 'web3-utils'
import abi from '@/web3/contracts/types/ZombieOwnership'
import { useState } from 'react'

export type Zombie = {
    id: string
    name: string,
    dna: string,
    level: number,
    lossCount: number,
    winCount: number,
    readyTime: number
}

type Fn = () => any

export class CryptoZombiesContract {
    private static readonly gas = '1000000'
    private static readonly gasPrice = '10000000000'
    private readonly contract: Contract<typeof abi>

    constructor(address: string) {
        const web3 = this.createWeb3Instance()
        this.contract = this.createContract(web3, address)
    }

    private createWeb3Instance(): Web3 {
        return new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/'))

        // return new Web3(window.ethereum)
    }

    private createContract(web3: Web3, address: string) {
        return new Contract(abi, address, web3)
    }

    async getZombiesByOwner(user: string): Promise<Zombie[]> {
        return this.getZombieIdsByOwner(user)
            .then(ids => Promise.all(ids.map(id => this.getZombieById(id))))
    }

    async getZombieIdsByOwner(user: string): Promise<string[]> {
        return this.contract.methods.getZombiesByOwner(user)
            .call()
            .then(ids => ids.map(id => id.toString()))
    }

    async getForeignZombies(user: string): Promise<Zombie[]> {
        return this.contract.getPastEvents(
            "NewZombie",
            {
                fromBlock: 0,
                toBlock: "latest"
            }
        )
            .then(async (events) => {
                const ownZombieIds = await this.getZombieIdsByOwner(user)
                const zombieIds = events.map(event => (event as any).returnValues.zombieId.toString())

                return zombieIds.filter(zombieId => !ownZombieIds.includes(zombieId))
            })
            .then(ids => Promise.all(ids.map(id => this.getZombieById(id))))
    }

    async getZombieById(id: string): Promise<Zombie> {
        return this.contract.methods.zombies(id)
            .call()
            .then((data: any) => ({
                id,
                name: data.name,
                dna: data.dna.toString(),
                level: toNumber(data.level) as number,
                winCount: toNumber(data.winCount) as number,
                lossCount: toNumber(data.lossCount) as number,
                readyTime: toNumber(data.readyTime) as number,
            }))
    }

    async attack(user: string, id: string, enemyId: string): Promise<TransactionReceipt> {
        return this.requestOrFail(() => {
            return this.contract.methods.attack(id, enemyId)
                .send({
                    from: user,
                    gas: CryptoZombiesContract.gas,
                    gasPrice: CryptoZombiesContract.gasPrice,
                })
        })
    }

    async createZombie(user: string, name: string): Promise<TransactionReceipt> {
        return this.requestOrFail(() => {
            return this.contract.methods.createRandomZombie(name)
                .send({
                    from: user,
                    gas: CryptoZombiesContract.gas,
                    gasPrice: CryptoZombiesContract.gasPrice,
                })
        })
    }

    async changeName(user: string, zombieId: string, name: string): Promise<TransactionReceipt> {
        return this.requestOrFail(() => {
            return this.contract.methods.changeName(zombieId, name)
                .send({
                    from: user,
                    gas: CryptoZombiesContract.gas,
                    gasPrice: CryptoZombiesContract.gasPrice,
                })
        })
    }


    async changeDNA(user: string, zombieId: string, dna: string): Promise<TransactionReceipt> {
        return this.requestOrFail(() => {
            return this.contract.methods.changeDna(zombieId, dna)
                .send({
                    from: user,
                    gas: CryptoZombiesContract.gas,
                    gasPrice: CryptoZombiesContract.gasPrice,
                })
        })
    }

    async levelUp(user: string, zombieId: string): Promise<TransactionReceipt> {
        return this.requestOrFail(() => {
            return this.contract.methods.levelUp(zombieId)
                .send({
                    from: user,
                    value: Web3.utils.toWei('0.001', 'ether'),
                    gas: CryptoZombiesContract.gas,
                    gasPrice: CryptoZombiesContract.gasPrice,
                })
        })
    }

    async setLevelUpFee(user: string, fee: string): Promise<TransactionReceipt> {
        return this.requestOrFail(() => {
            return this.contract.methods.setLevelUpFee(fee)
                .send({
                    from: user,
                    gas: CryptoZombiesContract.gas,
                    gasPrice: CryptoZombiesContract.gasPrice,
                })
        })
    }

    async getLevelUpFee(): Promise<string> {
        return new Promise((resolve) => {
            resolve('5') // TODO: handle this
        })
    }

    async feedOnKitty(user: string, zombieId: string, kittyId: string): Promise<TransactionReceipt> {
        return this.requestOrFail(() => {
            return this.contract.methods.feedOnKitty(zombieId, kittyId)
                .send({
                    from: user,
                    gas: CryptoZombiesContract.gas,
                    gasPrice: CryptoZombiesContract.gasPrice,
                })
        })
    }

    async setKittyContractAddress(user: string, kittyContractAddress: string): Promise<TransactionReceipt> {
        return this.requestOrFail(() => {
            return this.contract.methods.setKittyContractAddress(kittyContractAddress).send({
                from: user,
                gas: CryptoZombiesContract.gas,
                gasPrice: CryptoZombiesContract.gasPrice,
            })
        })
    }

    async getKittyContractAddress(): Promise<string> {
        return this.contract.methods.getKittyContractAddress().call()
    }

    private async requestOrFail(fn: Fn): Promise<TransactionReceipt> {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error('Connection error'))
            }, 1_500)

            fn()
                .on('receipt', (result: TransactionReceipt) => {
                    clearTimeout(timer)
                    resolve(result)
                })
                .on('error', (error: Error) => {
                    clearTimeout(timer)
                    reject(error)
                })
        })
    }
}

export const useZombiesContract = () => {
    const [zombiesContract, setZombiesContract] = useState<CryptoZombiesContract>(new CryptoZombiesContract(process.env.NEXT_PUBLIC_CRYPTO_ZOMBIES_CONTRACT_ADDRESS as string))

    return {
        zombiesContract,
        setZombiesContract
    }
}