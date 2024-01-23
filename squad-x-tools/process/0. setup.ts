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

const SECRET = decode('4pqR8ghxC9AGuUwiaP2cyZppgcTBzRLgtGU4XseysrnXE27jh2xtnNQR4K1Ne5Yg7xHbdU7i3bMyEDRVaF9fCNeJ')
// 6aMeb9AZU8cRrhsrL8Qt5hnzCaodZM1aZPU4tPxFrBKU
// const SECRET = new Uint8Array([
//   132, 175, 156, 42, 253, 100, 44, 186, 163, 145, 6, 187, 90, 238, 154, 66, 65, 254, 29, 29, 78, 166, 226, 159, 28, 60,
//   63, 241, 171, 139, 193, 121, 39, 213, 89, 185, 0, 52, 3, 34, 44, 26, 42, 11, 157, 156, 121, 195, 148, 200, 182, 75,
//   48, 175, 52, 92, 188, 196, 151, 98, 228, 46, 128, 104,
// ])

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
