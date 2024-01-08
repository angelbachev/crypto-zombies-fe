'use client'

import ZombieDetails from "@/app/components/zombie/ZombieDetails"
import { Zombie, useZombiesContract } from "@/web3/hooks/zombies-contract"
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"


const HEAD_VARIATIONS = 7
const EYES_VARIATIONS = 11
const SHIRT_VARIATIONS = 6

export default function Zombie() {
    const { zombiesContract } = useZombiesContract()

    const params = useParams<{ id: string }>()
    const [zombie, setZombie] = useState<Zombie | null>(null)
    const [canEditDNA, setCanEditDNA] = useState(false)
    const [originalDNA, setOriginalDNA] = useState('')
    const [headGene, setHeadGene] = useState(0)
    const [eyeGene, setEyeGene] = useState(0)
    const [shirtGene, setShirtGene] = useState(0)
    const [skinGene, setSkinGene] = useState(0)
    const [eyeColorGene, setEyeColorGene] = useState(0)
    const [clothesColorGene, setClothesColorGene] = useState(0)

    useEffect(() => {
        const fetchZombie = async () => {
            const zombieData = await zombiesContract.getZombieById(params.id)
            setZombie(zombieData)
            setOriginalDNA(zombieData.dna)
            setCanEditDNA(zombieData.level >= 20)
            setGenes(zombieData.dna)
        }

        fetchZombie()
    }, [])

    function getHueColor(value: string) {
        return parseInt(`${Number(value) / 100 * 360}`, 10)
    }

    function handleReset() {
        setGenes(originalDNA)
    }

    function setGenes(dna: string) {
        setHeadGene(Number(dna.substring(0, 2)) % HEAD_VARIATIONS + 1)
        setEyeGene(Number(dna.substring(2, 4)) % EYES_VARIATIONS + 1)
        setShirtGene(Number(dna.substring(4, 6)) % SHIRT_VARIATIONS + 1)
        setSkinGene(getHueColor(dna.substring(6, 8)))
        setEyeColorGene(getHueColor(dna.substring(8, 10)))
        setClothesColorGene(getHueColor(dna.substring(10, 12)))
    }

    function handleHeadChange(e: ChangeEvent<HTMLInputElement>) {
        setHeadGene(Number(e.target.value))
    }

    if (!zombie) {
        return <p>Loading...</p>
    }

    return (

        <article className="flex">
            <section>
                <ZombieDetails zombie={zombie} />
            </section>
            <section>
                <h2 className="text-3xl font-bold mb-2">Genes</h2>
                DNA: {zombie.dna}
                <form className="">
                    <div>
                        <label className="inline-block w-[160px] text-left">Head Gene</label>
                        <input type="range" min="1" max="7" name="head" value={headGene} onChange={handleHeadChange} disabled={!canEditDNA} />
                    </div>
                    <div>
                        <label className="inline-block w-[160px] text-left">Eye Gene</label>
                        <input type="range" min="1" max="11" name="head" value={eyeGene} onChange={e => setEyeGene(Number(e.target.value))} disabled={!canEditDNA} />
                    </div>
                    <div>
                        <label className="inline-block w-[160px] text-left">Shirt Gene</label>
                        <input type="range" min="1" max="6" name="head" value={shirtGene} onChange={e => setShirtGene(Number(e.target.value))} disabled={!canEditDNA} />
                    </div>
                    <div>
                        <label className="inline-block w-[160px] text-left">Skin Gene</label>
                        <input type="range" min="0" max="99" name="head" value={skinGene} onChange={e => setSkinGene(Number(e.target.value))} disabled={!canEditDNA} />
                    </div>
                    <div>
                        <label className="inline-block w-[160px] text-left">Eye Color Gene</label>
                        <input type="range" min="0" max="99" name="head" value={eyeColorGene} onChange={e => setEyeColorGene(Number(e.target.value))} disabled={!canEditDNA} />
                    </div>
                    <div>
                        <label className="inline-block w-[160px] text-left">Clothes Color Gene</label>
                        <input type="range" min="0" max="99" name="head" value={clothesColorGene} onChange={e => setClothesColorGene(Number(e.target.value))} disabled={!canEditDNA} />
                    </div>
                    <div className="flex justify-between mt-2">
                        <button className="rounded-lg border-2 px-2  border-orange-400 text-orange-400 font-bold" type="reset" onClick={handleReset}>Reset Genes</button>
                        <button className="rounded-lg border-2 px-2 border-green-700 text-green-700 font-bold">Update Genes</button>
                    </div>
                </form>
            </section>
        </article>
    )
}