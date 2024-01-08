type ZombieProps = {
    dna: string
}

const HEAD_VARIATIONS = 7
const EYES_VARIATIONS = 11
const SHIRT_VARIATIONS = 6

export const ZombieImage = ({ dna }: ZombieProps) => {
    const zombieDna = dna.padStart(16, '0')
    const catMode = zombieDna.endsWith('99')

    const head = Number(zombieDna.substring(0, 2)) % HEAD_VARIATIONS + 1
    const eye = Number(zombieDna.substring(2, 4)) % EYES_VARIATIONS + 1
    const shirt = Number(zombieDna.substring(4, 6)) % SHIRT_VARIATIONS + 1
    const skinColor = getHueColor(zombieDna.substring(6, 8))
    const eyeColor = getHueColor(zombieDna.substring(8, 10))
    const clothesColor = getHueColor(zombieDna.substring(10, 12))
    console.debug(head, eye, shirt, skinColor, eyeColor, clothesColor)

    function getHueColor(value: string) {
        return parseInt(`${Number(value) / 100 * 360}`, 10)
    }

    return (
        <div className="w-[280px] h-[338px]">
            <div className="relative left-[130px] top-[15px] w-[410px] h-[338px]">
                {!catMode && (
                    <>
                        <img
                            src="/images/zombieparts/left-feet-1@2x.png"
                            alt="Left zombie foot"
                            className={`w-[40px] absolute left-[182px] top-[299px] hue-rotate-[${clothesColor}deg]`}
                        />

                        <img
                            src="/images/zombieparts/right-feet-1@2x.png"
                            alt="Right zombie foot"
                            className={`w-[33px] absolute left-[222px] top-[302px] hue-rotate-[${clothesColor}deg]`}
                        />

                        <img
                            src="/images/zombieparts/left-leg-1@2x.png"
                            alt="Left zombie leg"
                            className={`w-[39px] absolute left-[182px] top-[269px] hue-rotate-[${clothesColor}deg]`}
                        />
                        <img
                            src="/images/zombieparts/right-leg-1@2x.png"
                            alt="Right zombie leg"
                            className={`w-[33px] absolute left-[222px] top-[275px] hue-rotate-[${clothesColor}deg]`}
                        />
                        <img
                            src="/images/zombieparts/left-thigh-1@2x.png"
                            alt="Left zombie thigh"
                            className={`w-[60px] absolute left-[172px] top-[219px] hue-rotate-[${clothesColor}deg]`}
                        />

                        <img
                            src="/images/zombieparts/right-thigh-1@2x.png"
                            alt="Right zombie thigh"
                            className={`w-[59px] absolute left-[203px] top-[219px] hue-rotate-[${clothesColor}deg]`}
                        />
                    </>
                )}
                <img
                    src="/images/zombieparts/right-upper-arm-1@2x.png"
                    alt="Right zombie upper arm"
                    className={`w-[60px] absolute left-[233px] top-[159px] hue-rotate-[${skinColor}deg]`}
                />

                <img
                    src="/images/zombieparts/torso-1@2x.png"
                    alt="Zombie torso"
                    className={`w-[130px] absolute left-[156px] top-[129px] hue-rotate-[${clothesColor}deg]`}
                />

                {catMode && <img
                    src="/images/zombieparts/catlegs.png"
                    alt="Cat Legs"
                    className={`w-[100px] absolute left-[153px] top-[179px] hue-rotate-[${clothesColor}deg]`}
                />}

                <img
                    src={`/images/zombieparts/shirt-${shirt}@2x.png`}
                    alt="Zombie Shirt"
                    className={`w-[130px] absolute left-[155px] top-[129px] hue-rotate-[${clothesColor}deg]`}
                />

                <img
                    src="/images/zombieparts/left-upper-arm-1@2x.png"
                    alt="Left zombie upper arm"
                    className={`w-[60px] absolute left-[192px] top-[159px] hue-rotate-[${skinColor}deg]`}
                />

                <img
                    src="/images/zombieparts/left-forearm-1@2x.png"
                    alt="Left zombie forearm"
                    className={`w-[40px] absolute left-[222px] top-[199px] hue-rotate-[${skinColor}deg]`}
                />
                <img
                    src="/images/zombieparts/right-forearm-1@2x.png"
                    alt="Right zombie forearm"
                    className={`w-[40px] absolute left-[263px] top-[199px] hue-rotate-[${skinColor}deg]`}
                />

                <img
                    src="/images/zombieparts/hand1-1@2x.png"
                    alt="Left zombie hand"
                    className={`w-[40px] absolute left-[242px] top-[189px] hue-rotate-[${skinColor}deg]`}
                />
                <img
                    src="/images/zombieparts/hand-2-1@2x.png"
                    alt="Right zombie hand"
                    className={`w-[40px] absolute left-[283px] top-[189px] hue-rotate-[${skinColor}deg]`}
                />

                <img
                    src={`/images/zombieparts/head-${head}@2x.png`}
                    alt="Zombie Head"
                    className={`w-[280px] absolute left-[129px] top-[-40px] hue-rotate-[${skinColor}deg]`}
                />
                <img
                    src={`/images/zombieparts/eyes-${eye}@2x.png`}
                    alt="Zombie Eyes"
                    className={`w-[129px] absolute left-[229px] top-[80px] hue-rotate-[${eyeColor}deg]`}
                />

                <img
                    src={`/images/zombieparts/mouth-1@2x.png`}
                    alt="Zombie Mouth"
                    className={`w-[60px] absolute left-[265px] top-[149px]`}
                />
            </div>
        </div>
    )
}
