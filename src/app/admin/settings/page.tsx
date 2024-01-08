'use client'

import { useAuth } from "@/app/contexts/auth"
import { useZombiesContract } from "@/web3/hooks/zombies-contract"
import { FormEvent, useEffect, useState } from "react"

export default function Settings() {
    const { zombiesContract } = useZombiesContract()
    const { address: user } = useAuth()

    const [kittyContract, setKittyContract] = useState('')
    const [levelUpFee, setLevelUpFee] = useState('0')


    useEffect(() => {
        const fetchKittyContract = async () => {
            setKittyContract(await zombiesContract.getKittyContractAddress())
        }

        const fetchLevelUpFee = async () => {
            setLevelUpFee(await zombiesContract.getLevelUpFee())
        }

        fetchKittyContract()
        fetchLevelUpFee()
    }, [])

    const handleKittyContractSubmit = async (e: FormEvent) => {
        e.preventDefault()
        zombiesContract.setKittyContractAddress(user, kittyContract)
    }

    const handleLevelUpSubmit = async (e: FormEvent) => {
        e.preventDefault()
        zombiesContract.setLevelUpFee(user, levelUpFee)
    }

    return (
        <>
            <h1 className='font-bold text-4xl text-center my-8'>Settings</h1>
            <form onSubmit={handleKittyContractSubmit} className="mb-2">
                <label htmlFor="kittyContract">Kitty Contract:</label>
                <input
                    type="text"
                    className="mx-2 rounded-md w-[420px]"
                    id="kittyContract"
                    value={kittyContract}
                    onChange={e => setKittyContract(e.target.value)}
                />
                <button
                    className="font-bold rounded-lg border-slate-50 border-2 px-4"
                    type="submit"
                >Save</button>
            </form>
            <form onSubmit={handleLevelUpSubmit}>
                <label htmlFor="levelUpFee">Level Up Fee:</label>
                <input
                    type="text"
                    className="mx-2 rounded-md"
                    id="levelUpFee"
                    value={levelUpFee}
                    onChange={e => setLevelUpFee(e.target.value)}
                /> Wei
                <button
                    className="ml-2 font-bold rounded-lg border-slate-50 border-2 px-4"
                    type="submit"
                >Save</button>
            </form>
        </>
    )
}
