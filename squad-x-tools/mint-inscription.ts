import {
  MPL_INSCRIPTION_PROGRAM_ID,
  allocate,
  findAssociatedInscriptionPda,
  findInscriptionMetadataPda,
  initialize,
  initializeAssociatedInscription,
  mplInscription,
  writeData,
} from '@metaplex-foundation/mpl-inscription'
import { TransactionBuilder, generateSigner, keypairIdentity } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { PublicKey } from '@solana/web3.js'
import { decode } from 'bs58'
const fs = require('fs')

const ENDPOINT = 'https://devnet-rpc.shyft.to?api_key=mODmQtBi3ONsDMgc'

const umi = createUmi(ENDPOINT).use(mplInscription())
const uintSecret = decode('4pqR8ghxC9AGuUwiaP2cyZppgcTBzRLgtGU4XseysrnXE27jh2xtnNQR4K1Ne5Yg7xHbdU7i3bMyEDRVaF9fCNeJ')

const handle = async () => {
  const keypair = umi.eddsa.createKeypairFromSecretKey(uintSecret)
  umi.use(keypairIdentity(keypair))

  console.log('1. Initializing Inscription')

  // const inscriptionAccount = generateSigner(umi)
  const inscriptionAccount = new PublicKey('AKQajbHSxhK12WTiuK3jrXpphXQzWpxTwzoMY7SzaEji')

  // const inscriptionMetadataAccount = await findInscriptionMetadataPda(umi, {
  //   inscriptionAccount: inscriptionAccount.publicKey,
  // })

  const inscriptionMetadataAccount = new PublicKey('Ax5Jwcm5btPK4tgDAo7j7d35MHUjugaV2L7HzJQFi6WR')

  let builder = new TransactionBuilder()

  // When we create a new account.
  // builder = builder.add(
  //   initialize(umi, {
  //     inscriptionAccount,
  //   })
  // )

  const associatedInscriptionAccount = findAssociatedInscriptionPda(umi, {
    associated_tag: 'image',
    inscriptionMetadataAccount,
  })

  builder = builder.add(
    initializeAssociatedInscription(umi, {
      inscriptionAccount: inscriptionAccount,
      associationTag: 'image',
    })
  )

  console.log('1.1. Signing and sending the transaction')
  await builder.sendAndConfirm(umi, { confirm: { commitment: 'finalized' } })

  console.log('2. Upload image')
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

  console.log('3. Get sized account')
  const sizedAccount = await umi.rpc.getAccount(associatedInscriptionAccount[0])
  // if (sizedAccount.exists) {
  //   console.log(JSON.stringify(sizedAccount.data.length))

  //   // t.is(sizedAccount.data.length, imageBytes.length)
  // }

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

    // console.log(JSON.stringify(imageData))

    // t.deepEqual(Buffer.from(imageData.data), imageBytes)

    // t.like(imageData, {
    //   owner: MPL_INSCRIPTION_PROGRAM_ID,
    // })
  }
}

handle()
