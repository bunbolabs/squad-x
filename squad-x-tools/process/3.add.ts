import { createNft } from '@metaplex-foundation/mpl-token-metadata'
import { generateSigner, percentAmount } from '@metaplex-foundation/umi'
import { File, NFTStorage } from 'nft.storage'
import { createUmi } from './0. setup'

import {
  allocate,
  findAssociatedInscriptionPda,
  findInscriptionMetadataPda,
  findInscriptionShardPda,
  findMintInscriptionPda,
  initializeAssociatedInscription,
  initializeFromMint,
  writeData,
} from '@metaplex-foundation/mpl-inscription'
import { TransactionBuilder } from '@metaplex-foundation/umi'
import fs from 'fs'
import { PublicKey } from '@solana/web3.js'
import Arweave from 'arweave'
const { ShdwDrive, ShadowFile } = require('@shadow-drive/sdk')

const client = new NFTStorage({
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUxOTc5RjMxYTM1MTIzMmEwNjE4ZTI0MDcxRTJiYTlkMDA4MEI3N2MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwNTkwNjU2NTMzOSwibmFtZSI6InRlc3QifQ.DPZNSacg1MYKGwr1y_V8BhApiKjHtg71ESVTOM6q5G0',
})

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
})

const handle = async () => {
  // ++++++++++++++++++++++++++++++++++++++++++++++++
  console.log('1. Create Instance of UMI')
  const umi = await createUmi()

  // ++++++++++++++++++++++++++++++++++++++++++++++++
  console.log('2. Read Image')
  const imageBytes: Buffer = await fs.promises.readFile('/Users/ha.nguyen/bunbolabs/squad-x/squad-x-tools/tard.jpg')

  console.log('3. Upload metadata')
  const metadata = await client.store({
    name: 'DINO TARDDDD',
    description: 'Raw raw raw',
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
      ],
    ],
  })

  const metadataUri = `https://${metadata.ipnft}.ipfs.nftstorage.link/metadata.json`
  console.log(metadataUri)

  // ++++++++++++++++++++++++++++++++++++++++++++++++
  console.log('3. Create NFT mint')
  const nftMint = generateSigner(umi)
  console.log('NFT Mint: ', nftMint.publicKey.toString())

  // ++++++++++++++++++++++++++++++++++++++++++++++++
  console.log('4. Find accounts')
  const inscriptionAccount = findMintInscriptionPda(umi, {
    mint: nftMint.publicKey,
  })
  const inscriptionMetadataAccount = findInscriptionMetadataPda(umi, {
    inscriptionAccount: inscriptionAccount[0],
  })
  const inscriptionShardAccount = findInscriptionShardPda(umi, {
    shardNumber: 0,
  })

  const associatedInscriptionAccount = findAssociatedInscriptionPda(umi, {
    associated_tag: 'image',
    inscriptionMetadataAccount,
  })

  console.log('inscriptionAccount', inscriptionAccount)
  console.log('inscriptionMetadataAccount', inscriptionMetadataAccount)
  console.log('inscriptionShardAccount', inscriptionShardAccount)
  console.log('associatedInscriptionAccount', associatedInscriptionAccount)

  // ++++++++++++++++++++++++++++++++++++++++++++++++
  console.log('5. Transaction builder')
  let builder = new TransactionBuilder()

  console.log('--> Added createNft instruction')
  // Create NFT
  builder = builder.add(
    createNft(umi, {
      mint: nftMint,
      name: `TUOT`,
      symbol: 'UMI',
      uri: metadataUri,
      sellerFeeBasisPoints: percentAmount(0),
      isCollection: false,
      collection: {
        key: new PublicKey('jgd9Z4DwsfQXzHkfrPQ7WBhZqpFgSnBkqgQefFjpR3M'),
      },
    })
  )

  console.log('--> Added initializeFromMint instruction')
  builder = builder.add(
    initializeFromMint(umi, {
      mintAccount: nftMint.publicKey,
      inscriptionShardAccount,
    })
  )

  console.log('--> Added initializeAssociatedInscription instruction')
  builder = builder.add(
    initializeAssociatedInscription(umi, {
      inscriptionAccount: inscriptionAccount,
      associationTag: 'image',
    })
  )

  // ++++++++++++++++++++++++++++++++++++++++++++++++
  console.log('6. Sign all transaction')
  await builder.sendAndConfirm(umi, { confirm: { commitment: 'finalized' } })

  // ++++++++++++++++++++++++++++++++++++++++++++++++
  console.log('7. Upload inscription image')
  const resizes = Math.floor(imageBytes.length / 10240) + 1
  for (let i = 0; i < resizes; i += 1) {
    await allocate(umi, {
      inscriptionAccount: associatedInscriptionAccount,
      inscriptionMetadataAccount,
      associatedTag: 'image',
      targetSize: imageBytes.length,
    }).sendAndConfirm(umi)
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++++
  console.log('8. Write inscription image data')
  // const sizedAccount = await umi.rpc.getAccount(associatedInscriptionAccount[0])
  // And set the value.
  const promises = []
  const chunkSize = 500
  for (let i = 0; i < imageBytes.length; i += chunkSize) {
    const chunk = imageBytes.slice(i, i + chunkSize)
    // eslint-disable-next-line no-await-in-loop
    promises.push(
      writeData(umi, {
        inscriptionAccount: associatedInscriptionAccount,
        inscriptionMetadataAccount,
        value: chunk,
        associatedTag: 'image',
        offset: i,
      }).sendAndConfirm(umi)
    )
  }

  await Promise.all(promises)

  // Then an account was created with the correct data.
  const imageData = await umi.rpc.getAccount(associatedInscriptionAccount[0])
  if (imageData.exists) {
    console.log(imageData.publicKey.toString())
    console.log(imageData.owner.toString())
  }
}

handle()
