import {
  createShard,
  fetchInscriptionShard,
  findInscriptionMetadataPda,
  findInscriptionShardPda,
  findMintInscriptionPda,
  initializeFromMint,
  mplInscription,
  safeFetchInscriptionShard,
} from '@metaplex-foundation/mpl-inscription'
import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { Umi, generateSigner, keypairIdentity, percentAmount } from '@metaplex-foundation/umi'
import { createUmi as basecreateUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { decode } from 'bs58'
import pMap from 'p-map'

const uintSecret = decode('4pqR8ghxC9AGuUwiaP2cyZppgcTBzRLgtGU4XseysrnXE27jh2xtnNQR4K1Ne5Yg7xHbdU7i3bMyEDRVaF9fCNeJ')

const handle = async () => {
  // Given a Umi instance and a new signer.
  const umi = await createUmi()
  umi.use(mplTokenMetadata())

  const keypair = umi.eddsa.createKeypairFromSecretKey(uintSecret)
  umi.use(keypairIdentity(keypair))

  console.log('1. Minting NFT')
  const nftMint = generateSigner(umi)
  await createNft(umi, {
    mint: nftMint,
    name: `Uminft`,
    symbol: 'UMI',
    uri: 'https://raw.githubusercontent.com/687c/solana-nft-native-client/main/metadata.json',
    sellerFeeBasisPoints: percentAmount(0),
    isCollection: false,
  }).sendAndConfirm(umi, { confirm: 'confirmed' })

  // // Show token address
  // console.log(nftMint.publicKey)
  // console.log('FokHKCYSVCbN5PeGQi6574ioF2p3SG4ySZNEd9SYwvWP')
  // const nftMint = await fetchDigitalAsset(umi, new PublicKey('FokHKCYSVCbN5PeGQi6574ioF2p3SG4ySZNEd9SYwvWP'))

  console.log('3. Creating Inscription')
  const inscriptionAccount = await findInscriptionMetadataPda(umi, {
    mint: nftMint.publicKey,
  })
  const inscriptionMetadataAccount = await findInscriptionMetadataPda(umi, {
    inscriptionAccount: inscriptionAccount[0],
  })

  const inscriptionShardAccount = await findInscriptionShardPda(umi, {
    shardNumber: 0,
  })
  const shardDataBefore = await fetchInscriptionShard(umi, inscriptionShardAccount)

  console.log('4. Initializing Inscription')
  await initializeFromMint(umi, {
    mintAccount: nftMint.publicKey,
    inscriptionShardAccount,
  }).sendAndConfirm(umi)

  // Then an account was created with the correct data.
  // const inscriptionMetadata = await fetchInscriptionMetadata(umi, inscriptionMetadataAccount)

  // const shardDataAfter = await fetchInscriptionShard(umi, inscriptionShardAccount)

  // console.log(inscriptionMetadata)
  // console.log(shardDataAfter)

  // const jsonData = await umi.rpc.getAccount(inscriptionAccount[0])

  // console.log(jsonData)
}

export const createUmi = async () => {
  const ENDPOINT = 'https://devnet-rpc.shyft.to?api_key=mODmQtBi3ONsDMgc'
  const umi = basecreateUmi(ENDPOINT).use(mplInscription())

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

handle()
