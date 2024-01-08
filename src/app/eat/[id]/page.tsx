'use client'

import ZombieDetails from "@/app/components/zombie/ZombieDetails"
import { useAuth } from "@/app/contexts/auth"
import { Kitty, useKittiesContract } from "@/web3/hooks/kitties-contract"
import { Zombie, useZombiesContract } from "@/web3/hooks/zombies-contract"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const BASE_IMAGE_URL = 'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/'

export default function Eat() {
    const { zombiesContract } = useZombiesContract()
    const params: { id: string } = useParams()
    const [myZombie, setMyZombie] = useState<Zombie | null>()
    const { kittiesContract } = useKittiesContract(process.env.NEXT_PUBLIC_CRYPTO_KITTIES_CONTRACT_ADDRESS as string)

    const { address } = useAuth()

    const router = useRouter()

    useEffect(() => {
        const fetchMyZombie = async () => {
            setMyZombie(await zombiesContract.getZombieById(params.id))
        }

        fetchMyZombie()
    }, [])

    const [kitties, setKitties] = useState<string[]>([])
    useEffect(() => {
        const fetchKitties = async () => {
            //https://api.cryptokitties.co/v3/kitties?include=sale,sire,other&orderBy=current_price&orderDirection=asc&offset=0&limit=20
            setKitties(await kittiesContract.getKittiesIds())
        }

        fetchKitties()
    }, [])

    const handleEat = async (kittyId: string) => {
        await zombiesContract.feedOnKitty(address, myZombie?.id as string, kittyId)
        router.push("/army")
    }

    const renderKitties = kitties.map(kittyId => {
        return (
            <li key={`kitty_${kittyId}`} className="flex flex-col items-center">
                <Image width={250} height={250} alt={`Kitty ${kittyId} image`} src={`${BASE_IMAGE_URL}${kittyId}.svg`} />
                <button className="border-2 px-2 rounded-lg" onClick={e => handleEat(kittyId)}>Eat</button>
            </li>
        )
    })

    console.log(renderKitties)

    return (
        <>
            <h1 className="text-5xl font-extrabold mb-5">Eat Kitty</h1>
            <section className="flex flex-col items-center mb-5">
                <h2 className="text-3xl">My Zombie</h2>
                {myZombie && <ZombieDetails zombie={myZombie} />}
            </section>
            <section>
                <h2 className="text-3xl">Choose Kitty to eat</h2>
                <ul className="grid grid-cols-3">
                    {renderKitties}
                </ul>
            </section>
        </>
    )
}