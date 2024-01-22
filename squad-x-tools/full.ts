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
import {
  TokenStandard,
  createNft,
  createV1,
  fetchDigitalAsset,
  mintV1,
  mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata'
import { Umi, generateSigner, keypairIdentity, percentAmount, transactionBuilder } from '@metaplex-foundation/umi'
import { PublicKey } from '@solana/web3.js'
import { decode } from 'bs58'
import pMap from 'p-map'
import { createUmi as basecreateUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { NFTStorage, File, Blob } from 'nft.storage'
import fs from 'fs'

const ENDPOINT = 'https://devnet-rpc.shyft.to?api_key=mODmQtBi3ONsDMgc'
const SECRET = decode('4pqR8ghxC9AGuUwiaP2cyZppgcTBzRLgtGU4XseysrnXE27jh2xtnNQR4K1Ne5Yg7xHbdU7i3bMyEDRVaF9fCNeJ')

const client = new NFTStorage({
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUxOTc5RjMxYTM1MTIzMmEwNjE4ZTI0MDcxRTJiYTlkMDA4MEI3N2MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwNTkwNjU2NTMzOSwibmFtZSI6InRlc3QifQ.DPZNSacg1MYKGwr1y_V8BhApiKjHtg71ESVTOM6q5G0',
})

const handle = async () => {
  console.log('1. Create Instance of UMI')
  const umi = await createUmi()
  umi.use(mplTokenMetadata())

  const keypair = umi.eddsa.createKeypairFromSecretKey(SECRET)
  umi.use(keypairIdentity(keypair))

  const imageBytes: Buffer = await fs.promises.readFile(
    '/Users/ha.nguyen/bunbolabs/squad-x/squad-x-tools/mint-nft/uploads/doux.jpg'
  )

  console.log('2. Upload metadata')
  const metadata = await client.store({
    name: 'My sweet NFT',
    description: "Just try to funge it. You can't do it.",
    image: new File([imageBytes], 'doux.jpg', { type: 'image/jpeg' }),
    symbol: 'DINO',
    attributes: [
      [
        {
          trait_type: 'Gender',
          value: 'Female',
        },
        {
          trait_type: 'Type',
          value: 'Dark',
        },
        {
          trait_type: 'Expression',
          value: 'Smile',
        },
        {
          trait_type: 'Hat',
          value: 'Cartwheel',
        },
        {
          trait_type: 'Hair',
          value: 'Long Purple',
        },
        {
          trait_type: 'Eyes',
          value: 'Purple',
        },
        {
          trait_type: 'Mouth',
          value: 'Pink',
        },
        {
          trait_type: 'Clothing',
          value: 'Noir Dress',
        },
        {
          trait_type: 'Background',
          value: 'Purple',
        },
      ],
    ],
  })

  const uri = `https://${metadata.ipnft}.ipfs.nftstorage.link/metadata.json`
  console.log(uri)

  console.log('2. Create NFT')
  const nftMint = generateSigner(umi)

  const createNftTx = await createNft(umi, {
    mint: nftMint,
    name: `TUOT`,
    symbol: 'UMI',
    uri,
    sellerFeeBasisPoints: percentAmount(0),
    isCollection: false,
  }).sendAndConfirm(umi, { confirm: 'finalized' })

  console.log('Mint: ', nftMint.publicKey.toString())
  console.log('NFT minted tx:', createNftTx.result)

  // console.log('3. Create Inscription')

  // const inscriptionAccount = findMintInscriptionPda(umi, {
  //   mint: new PublicKey('5WtkcutkdfExxK7x2mFRP42CrvhP6GsdaU4kmLrdtQtP'),
  // })
  // const inscriptionMetadataAccount = await findInscriptionMetadataPda(umi, {
  //   inscriptionAccount: inscriptionAccount[0],
  // })

  // const inscriptionShardAccount = findInscriptionShardPda(umi, {
  //   shardNumber: 0,
  // })

  // // const shardDataBefore = await fetchInscriptionShard(umi, inscriptionShardAccount)

  // // console.log(inscriptionAccount)
  // // console.log(inscriptionMetadataAccount)
  // // console.log(inscriptionShardAccount)
  // // console.log(shardDataBefore)

  // console.log('4. Initializing Inscription')
  // await initializeFromMint(umi, {
  //   mintAccount: new PublicKey('5WtkcutkdfExxK7x2mFRP42CrvhP6GsdaU4kmLrdtQtP'),
  //   inscriptionShardAccount,
  // }).sendAndConfirm(umi)

  // try {
  // } catch (error) {}

  // const asset = await fetchDigitalAsset(umi, nftMint.publicKey)
  // const asset = await fetchDigitalAsset(umi, new PublicKey('5WtkcutkdfExxK7x2mFRP42CrvhP6GsdaU4kmLrdtQtP'))

  // const inscriptionAccount = await findInscriptionMetadataPda(umi, {
  //   mint: nftMint.publicKey,
  // })
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
