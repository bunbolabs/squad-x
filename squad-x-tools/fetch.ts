import { createNft, fetchAllDigitalAssetWithTokenByOwner } from '@metaplex-foundation/mpl-token-metadata'
import { generateSigner, percentAmount } from '@metaplex-foundation/umi'
import fs from 'fs'
import { File, NFTStorage } from 'nft.storage'
import { createUmi } from './process/0. setup'
import { fetchAllDigitalAssetWithTokenByMint } from '@metaplex-foundation/mpl-token-metadata'
import { PublicKey } from '@solana/web3.js'

const client = new NFTStorage({
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUxOTc5RjMxYTM1MTIzMmEwNjE4ZTI0MDcxRTJiYTlkMDA4MEI3N2MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwNTkwNjU2NTMzOSwibmFtZSI6InRlc3QifQ.DPZNSacg1MYKGwr1y_V8BhApiKjHtg71ESVTOM6q5G0',
})

const handle = async () => {
  console.log('1. Create Instance of UMI')
  const umi = await createUmi()

  const owner = new PublicKey('3gKfFtQo9DagJfFJeopXRPsXXZhpNosCPY326LGMH7pV')

  const assets = await fetchAllDigitalAssetWithTokenByOwner(umi, owner)

  console.log(assets)
}

handle()
