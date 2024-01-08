import { Zombie } from "@/web3/hooks/zombies-contract";
import { ZombieImage } from "./ZombieImage";

type ZombieDetailsProps = {
    zombie: Zombie
}

export default function ZombieDetails({ zombie }: ZombieDetailsProps) {
    return (
        <div className="bg-[url('/images/zombie_bg.png')] bg-contain w-[372px] h-[642px]">
            <h1 className="relative top-[62px] text-2xl italic font-bold">{zombie.name}</h1>
            <div className="relative top-[120px] left-[30px] bg-[url('/images/level.png')] bg-contain w-[54px] h-[64px] grid content-center text-xl font-bold">{zombie.level}</div>
            <div className="relative top-[460px] left-[60px] w-[250px] flex justify-between">
                <div className="bg-red-700 w-[36px] h-[36px] rounded-[18px] grid content-center font-extrabold">{zombie.lossCount}</div>
                <div className="bg-green-700 w-[36px] h-[36px] rounded-[18px] grid content-center font-extrabold">{zombie.winCount}</div> 
            </div>
            <div className="relative top-[80px] left-[-200px]">
                <ZombieImage dna={'' + zombie.dna} />
            </div>
        </div>
    )
}