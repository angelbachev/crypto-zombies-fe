'use client'

import { FormEvent, useEffect, useState } from "react"
import { useZombiesContract } from "@/web3/hooks/zombies-contract"
import { CryptoKittiesContract, useKittiesContract } from "@/web3/hooks/kitties-contract"
import { useRouter } from "next/navigation"
import { useAuth } from "./contexts/auth"

export default function Home() {
  const { address, isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [])

  const { zombiesContract } = useZombiesContract()
  const { kittiesContract } = useKittiesContract(process.env.NEXT_PUBLIC_CRYPTO_KITTIES_CONTRACT_ADDRESS as string)


  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [zombieId, setZombieId] = useState('')
  const [enemyId, setEnemyId] = useState('')
  const [kittyId, setKittyId] = useState('')
  const [kittyGenes, setKittyGenes] = useState('')

  // const ids = [2023461, 2023462, 2023463, 2023464];
  // const genes = [
  //   "628079516603167937505550371949243854553241459749706268951321943647192097",
  //   "241581720882345840826530416449610077917568793411866277407546080279795156",
  //   "628295030008073328031444275748460409888271886088522356983483785785063617",
  //   "463018625203047166245386726632628581844676267906694227885750172493383619",
  // ];

  const handleCreateZombie = async (e: FormEvent) => {
    e.preventDefault()
    console.log('create zombie')

    try {
      await zombiesContract.createZombie(address, name)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const handleFeedOnKitty = async (e: FormEvent) => {
    e.preventDefault()
    console.log('feed on kitty')
    zombiesContract.feedOnKitty(address, zombieId, kittyId)
  }

  const handleAttack = async (e: FormEvent) => {
    e.preventDefault()
    console.log('attack')

    zombiesContract.attack(address, zombieId, enemyId)
  }

  const handleCreateKitty = async (e: FormEvent) => {
    e.preventDefault()

    kittiesContract.createKitty(address, kittyId, kittyGenes)
  }

  const handleGetKitties = async () => {
    const kitties = await kittiesContract.getKittiesIds()
    console.log({ kitties });
  }

  return (
    <>
      <form onSubmit={handleCreateZombie}>
        <label htmlFor='name'>Name</label>
        <input type="text"
          className="mx-2 rounded-md"
          id="name"
          name="name"
        />
        <button className="font-bold rounded-lg border-slate-50 border-2 px-4" type='submit'>Create Zombie</button>
      </form>
      {error && <p className="bg-red-400 text-slate-50 font-semibold mt-4 rounded-lg py-2 text-center">{error}</p>}

      <form onSubmit={handleFeedOnKitty}>
        <label htmlFor='zombieId'>Zombie ID</label>
        <input type="text" id="zombieId" value={zombieId} onChange={e => setZombieId(e.target.value)} />
        <label htmlFor='kittyId'>Kitty ID</label>
        <input type="text" id="kittyId" value={kittyId} onChange={e => setKittyId(e.target.value)} />
        <button type='submit'>Feed on Kitty</button>
      </form>

      <form onSubmit={handleAttack}>
        <label htmlFor='zombieId'>Zombie ID</label>
        <input type="text" id="zombieId" value={zombieId} onChange={e => setZombieId(e.target.value)} />
        <label htmlFor='enemyId'>Enemy ID</label>
        <input type="text" id="enemyId" value={enemyId} onChange={e => setEnemyId(e.target.value)} />
        <button type='submit'>Attack</button>
      </form>

      <form onSubmit={handleCreateKitty}>
        <label htmlFor='kittyId'>Kitty ID</label>
        <input type="text" id="kittyId" value={kittyId} onChange={e => setKittyId(e.target.value)} />
        <label htmlFor='kittyGenes'>Kitty Genes</label>
        <input type="text" id="kittyGenes" value={kittyGenes} onChange={e => setKittyGenes(e.target.value)} />
        <button type='submit'>Create Kitty</button>
      </form>
      <button onClick={handleGetKitties}>Get Kitties</button>
    </>
  )
}
