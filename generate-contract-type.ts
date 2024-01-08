const fs = require('fs')

const input = process.argv[2]
const output = process.argv[3]
console.log(input, output)

const content = fs.readFileSync(input, 'utf-8')
const abi = JSON.parse(content).abi
const abiContent = JSON.stringify(abi, null, 4)
fs.writeFileSync(
    output,
    `const artifact = ${abiContent} as const; \n\nexport default artifact;`,
)
