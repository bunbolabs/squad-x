import { Connection, Keypair } from '@solana/web3.js'
import { IRONFORGE_URL } from '@/services/ironforge'
import * as anchor from '@coral-xyz/anchor'
import { decode } from 'bs58'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'

export const ADMIN_KEYPAIR = Keypair.fromSecretKey(decode(process.env.ADMIN_PRIVATE_KEY!))

export const ADMIN_WALLET = new NodeWallet(Keypair.fromSecretKey(decode(process.env.ADMIN_PRIVATE_KEY!)))

export const connection = new Connection(IRONFORGE_URL, 'processed')
// export const connection = new Connection('http://127.0.0.1:8899', 'processed')

export const provider = new anchor.AnchorProvider(connection, ADMIN_WALLET, {
  commitment: 'confirmed',
})
