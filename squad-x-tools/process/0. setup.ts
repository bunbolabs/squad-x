import {
  createShard,
  findInscriptionShardPda,
  mplInscription,
  safeFetchInscriptionShard,
} from '@metaplex-foundation/mpl-inscription'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { Umi, keypairIdentity } from '@metaplex-foundation/umi'
import { createUmi as basecreateUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { decode } from 'bs58'
import pMap from 'p-map'

const ENDPOINT = 'https://devnet-rpc.shyft.to?api_key=mODmQtBi3ONsDMgc'
const SECRET = decode('54DRp1AzmPDRKoUdisauCESpZcEP2mn4kzdyTLSpuzKVMNjmBJbXjF4BczzAkwJP8QSrLGTtmmuE6LbKXXDq5WQH')

export const createUmi = async () => {
  const umi = basecreateUmi(ENDPOINT).use(mplInscription())

  umi.use(mplTokenMetadata())

  const keypair = umi.eddsa.createKeypairFromSecretKey(SECRET)
  umi.use(keypairIdentity(keypair))

  // Use pMap to parallelize the creation of all 32 shards.
  await pMap(
    Array(32).fill(0),
    async (_, shardNumber) => {
      await createShardIdempotent(umi, shardNumber)
    },
    { concurrency: 32 }
  )

  return umi
}

async function createShardIdempotent(umi: Umi, shardNumber: number) {
  const shardAccount = findInscriptionShardPda(umi, { shardNumber })

  // Check if the account has already been created.
  const shardData = await safeFetchInscriptionShard(umi, shardAccount)

  if (!shardData) {
    await createShard(umi, {
      shardAccount,
      shardNumber,
    }).sendAndConfirm(umi)
  }
}
