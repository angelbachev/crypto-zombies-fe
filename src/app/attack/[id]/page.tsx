'use client'

import ZombieDetails from "@/app/components/zombie/ZombieDetails"
import { useAuth } from "@/app/contexts/auth"
import { Zombie, useZombiesContract } from "@/web3/hooks/zombies-contract"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Attack() {
    const { zombiesContract } = useZombiesContract()
    const params: { id: string } = useParams()
    const [myZombie, setMyZombie] = useState<Zombie | null>()
    const { address } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const fetchMyZombie = async () => {
            setMyZombie(await zombiesContract.getZombieById(params.id))
        }

        fetchMyZombie()
    }, [])

    const [zombies, setZombies] = useState<Zombie[]>([])
    useEffect(() => {
        const fetchZombies = async () => {
            setZombies(await zombiesContract.getForeignZombies(address))
        }

        fetchZombies()
    }, [])

    const handleAttack = async (enemyId: string) => {
        await zombiesContract.attack(address, myZombie?.id as string, enemyId)
        router.push("/army")
    }

    const enemies = zombies.map(zombie => {
        return (
            <li className="flex flex-col items-center">
                <ZombieDetails key={`enemy_${zombie.id}`} zombie={zombie} />
                <button className="border-2 px-2 rounded-lg" onClick={e => handleAttack(zombie.id)}>Attack</button>
            </li>
        )
    })

    return (
        <>
            <h1 className="text-5xl font-extrabold mb-5">Battle</h1>
            <section className="flex flex-col items-center mb-5">
                <h2 className="text-3xl">My Zombie</h2>
                {myZombie && <ZombieDetails zombie={myZombie} />}
            </section>
            <section>
                <h2 className="text-3xl">Choose Zombie to attack</h2>
                <ul className="grid grid-cols-3">
                    {enemies}
                </ul>
            </section>
        </>
    )
}