import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'
import { Keypair, PublicKey } from '@solana/web3.js'

import { SQUAD_X_DECIMALS, SQUAD_X_TOKEN_MINT } from '@/constants'
import { connection } from '@/services/solana'
import { decode } from 'bs58'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const { destination } = await request.json()

  const fromWallet = Keypair.fromSecretKey(decode(process.env.ADMIN_PRIVATE_KEY!))

  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet,
    new PublicKey(SQUAD_X_TOKEN_MINT),
    new PublicKey(destination)
  )

  let signature = await mintTo(
    connection,
    fromWallet,
    new PublicKey(SQUAD_X_TOKEN_MINT),
    toTokenAccount.address,
    fromWallet.publicKey,
    10 * SQUAD_X_DECIMALS
  )

  return Response.json({ signature })
}
