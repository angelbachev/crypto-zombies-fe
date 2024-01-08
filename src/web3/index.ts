import { validator } from "web3"

export const isAddress = (address: string) => validator.isAddress(address)