import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

import { SQUAD_X_DECIMALS, SQUAD_X_TOKEN_MINT } from '@/constants'
import { ADMIN_KEYPAIR, connection } from '@/services/solana'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const { destination } = await request.json()

  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    ADMIN_KEYPAIR,
    new PublicKey(SQUAD_X_TOKEN_MINT),
    new PublicKey(destination)
  )

  let signature = await mintTo(
    connection,
    ADMIN_KEYPAIR,
    new PublicKey(SQUAD_X_TOKEN_MINT),
    toTokenAccount.address,
    ADMIN_KEYPAIR.publicKey,
    10 * SQUAD_X_DECIMALS
  )

  return Response.json({ signature })
}
