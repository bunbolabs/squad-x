import { Connection } from '@solana/web3.js'
import { IRONFORGE_URL } from '@/services/ironforge'

export const connection = new Connection(IRONFORGE_URL, 'confirmed')
