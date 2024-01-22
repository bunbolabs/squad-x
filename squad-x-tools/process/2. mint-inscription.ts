import {
  allocate,
  fetchInscriptionShard,
  findAssociatedInscriptionPda,
  findInscriptionMetadataPda,
  findInscriptionShardPda,
  findMintInscriptionPda,
  initializeAssociatedInscription,
  initializeFromMint,
  writeData,
} from '@metaplex-foundation/mpl-inscription'
import { fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata'
import { TransactionBuilder } from '@metaplex-foundation/umi'
import { PublicKey } from '@solana/web3.js'
import fs from 'fs'
import { createUmi } from './0. setup'

const handle = async () => {
  console.log('1. Create Instance of UMI')
  const umi = await createUmi()

  const mint = new PublicKey('G9cUwZKW2mWtWyGBtfXj8dWUigNvZXRH3orXGcZsv56N')

  console.log('2. Fetch nft')
  const asset = await fetchDigitalAsset(umi, mint)
  console.log('MINT: ', asset.publicKey.toString())

  console.log('3. Initialize Inscription account')

  const inscriptionAccount = findMintInscriptionPda(umi, {
    mint: asset.publicKey,
  })
  const inscriptionMetadataAccount = await findInscriptionMetadataPda(umi, {
    inscriptionAccount: inscriptionAccount[0],
  })

  const inscriptionShardAccount = findInscriptionShardPda(umi, {
    shardNumber: 0,
  })

  const shardDataBefore = await fetchInscriptionShard(umi, inscriptionShardAccount)

  console.log('inscriptionAccount', inscriptionAccount)
  console.log('inscriptionMetadataAccount', inscriptionMetadataAccount)
  console.log('inscriptionShardAccount', inscriptionShardAccount)

  console.log('4. Initializing Inscription')
  let builder = new TransactionBuilder()

  builder = builder.add(
    initializeFromMint(umi, {
      mintAccount: asset.publicKey,
      inscriptionShardAccount,
    })
  )

  builder = builder.add(
    initializeAssociatedInscription(umi, {
      inscriptionAccount: inscriptionAccount,
      associationTag: 'image',
    })
  )

  console.log('5. Signing and sending the transaction')
  await builder.sendAndConfirm(umi, { confirm: { commitment: 'finalized' } })

  const associatedInscriptionAccount = findAssociatedInscriptionPda(umi, {
    associated_tag: 'image',
    inscriptionMetadataAccount,
  })

  console.log('6. Upload image')
  const imageBytes: Buffer = await fs.promises.readFile('/Users/ha.nguyen/bunbolabs/squad-x/squad-x-tools/doux.jpg')
  const resizes = Math.floor(imageBytes.length / 10240) + 1
  for (let i = 0; i < resizes; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await allocate(umi, {
      inscriptionAccount: associatedInscriptionAccount,
      inscriptionMetadataAccount,
      associatedTag: 'image',
      targetSize: imageBytes.length,
    }).sendAndConfirm(umi)
  }

  console.log('7. Get sized account')
  const sizedAccount = await umi.rpc.getAccount(associatedInscriptionAccount[0])
  if (sizedAccount.exists) {
    console.log(sizedAccount.data.length)
  }

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
