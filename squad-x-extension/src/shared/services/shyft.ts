import { Network, ShyftSdk } from '@shyft-to/js'

const SHYFT_API_KEY = 'Sw2YO3HEAiNUHQct'

export const shyft = new ShyftSdk({ apiKey: SHYFT_API_KEY, network: Network.Devnet })
