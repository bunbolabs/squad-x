import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

import { SQUAD_X_DECIMALS, SQUAD_X_TOKEN_MINT } from '@/constants'
import { ADMIN_KEYPAIR, connection } from '@/services/solana'
import _ from 'lodash'

export async function POST(request: Request, { params }: { params: { address: string } }) {
  const address = params.address

  console.log(ADMIN_KEYPAIR.publicKey.toString())

  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    ADMIN_KEYPAIR,
    new PublicKey(SQUAD_X_TOKEN_MINT),
    new PublicKey(address)
  )

  // const tokenAccount = await getOrCreateAssociatedTokenAccount(
  //   connection,
  //   payer,
  //   mint,
  //   payer.publicKey
  // )

  console.log(toTokenAccount.address.toString())

  let signature = await mintTo(
    connection,
    ADMIN_KEYPAIR,
    new PublicKey(SQUAD_X_TOKEN_MINT),
    toTokenAccount.address,
    ADMIN_KEYPAIR.publicKey,
    _.random(1, 5) * SQUAD_X_DECIMALS
  )

  return Response.json({ signature })
}
