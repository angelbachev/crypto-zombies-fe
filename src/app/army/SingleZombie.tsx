import { Zombie, useZombiesContract } from "@/web3/hooks/zombies-contract"
import { useAuth } from "../contexts/auth"
import { useState } from "react"
import Link from "next/link"
import ZombieDetails from "../components/zombie/ZombieDetails"


type Props = {
    zombie: Zombie
}
export function SingleZombie(props: Props) {
    const { zombiesContract } = useZombiesContract()
    const [zombie, setZombie] = useState<Zombie>(props.zombie)
    const [readyTime] = useState<Date>(new Date(zombie.readyTime * 1000))
    const [isNameEditEnabled, setIsNameEditEnabled] = useState(false)
    const [name, setName] = useState(props.zombie.name)
    const { address } = useAuth()

    const handleLevelUp = async () => {
        console.log('level up')
        try {
            await zombiesContract.levelUp(address, zombie.id)
            setZombie(await zombiesContract.getZombieById(zombie.id))
        } catch (error) {
            console.log(error)
        }
    }

    const editName = async () => {
        if (isNameEditEnabled) {
            console.log('change name', name)
            try {
                await zombiesContract.changeName(address, zombie.id, name)
                console.log(await zombiesContract.getZombieById(zombie.id))
                setZombie(await zombiesContract.getZombieById(zombie.id))
                setIsNameEditEnabled(false)
                console.log('success')
            } catch (error) {
                console.log(error)
            }
        } else {
            setIsNameEditEnabled(true)
        }
    }

    const closeName = () => {
        setName(zombie.name)
        setIsNameEditEnabled(false)
    }

    return (
        <div className="m-5 p-2 flex flex-col items-center">
            <Link href={`/zombie/${zombie.id}`}><ZombieDetails zombie={zombie} /></Link>
            <div className="flex place-items-end mb-2">Ready: &nbsp;<span className="text-green-500">{readyTime.toLocaleString()}</span></div>
            <div className="flex">
                <Link aria-disabled={readyTime > (new Date())} className={`border-2 px-2 rounded-md mt-1 aria-disabled:text-orange-400 aria-disabled:border-orange-400 aria-disabled:pointer-events-none`} href={`/attack/${zombie.id}`}>Attack</Link>
                <button className="mx-10 border-2 px-2 rounded-md mt-1" onClick={handleLevelUp}>Level Up</button>
                <Link aria-disabled={readyTime > (new Date())} className={`border-2 px-2 rounded-md mt-1 aria-disabled:text-orange-400 aria-disabled:border-orange-400 aria-disabled:pointer-events-none`} href={`/eat/${zombie.id}`}>Eat Kitty</Link>
            </div>
        </div >
    )
}