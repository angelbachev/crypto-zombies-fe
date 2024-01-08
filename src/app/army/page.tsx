'use client'

import { Zombie, useZombiesContract } from "@/web3/hooks/zombies-contract"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/auth"
import { SingleZombie } from "./SingleZombie"


export default function Army() {
    const { zombiesContract } = useZombiesContract()
    const { address } = useAuth()
    const [zombies, setZombies] = useState<Zombie[]>([])

    useEffect(() => {
        const fetchZombies = async () => {
            setZombies(await zombiesContract.getZombiesByOwner(address))
        }

        fetchZombies()
    }, [])

    return (
        <section className="flex flex-col">
            <h1 className="text-center font-bold text-2xl m-4">My Army</h1>
            {zombies && <div className="grid grid-cols-3">
                {zombies.map(zombie => <SingleZombie key={`zombie_${zombie.id}`} zombie={zombie} />)}
            </div>}
        </section>
    )
}