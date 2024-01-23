import {
  TokenStandard,
  createNft,
  delegateAuthorityItemV1,
  transferV1,
  updateAsAuthorityItemDelegateV2,
} from '@metaplex-foundation/mpl-token-metadata'
import { generateSigner, percentAmount } from '@metaplex-foundation/umi'
import { File, NFTStorage } from 'nft.storage'
import { createUmi } from './0. setup'

import {
  addAuthority,
  allocate,
  findAssociatedInscriptionPda,
  findInscriptionMetadataPda,
  findInscriptionShardPda,
  findMintInscriptionPda,
  initializeAssociatedInscription,
  initializeFromMint,
  removeAuthority,
  writeData,
} from '@metaplex-foundation/mpl-inscription'
import { TransactionBuilder } from '@metaplex-foundation/umi'
import fs from 'fs'
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js'
import Arweave from 'arweave'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import { decode } from 'bs58'
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
    name: 'DINO#8',
    description: 'Raw raw raw',
    image: new File([imageBytes], 'doux.jpg', { type: 'image/jpeg' }),
    symbol: 'DINO#8',
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
      name: `DINO#8`,
      symbol: 'DINO#8',
      uri: metadataUri,
      sellerFeeBasisPoints: percentAmount(0),
      isCollection: false,
      creators: [
        {
          address: new PublicKey('GpjDzFpdim6q2GLaRcZTFbDs3G6SgVLKFZYCqDwCmd2u'),
          share: 50,
        },

        {
          address: new PublicKey('6aMeb9AZU8cRrhsrL8Qt5hnzCaodZM1aZPU4tPxFrBKU'),
          share: 50,
        },
      ],
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

  // console.log('--> Added addAuthority instruction')
  // builder = builder.add(
  //   addAuthority(umi, {
  //     inscriptionMetadataAccount,
  //     newAuthority: new PublicKey('GpjDzFpdim6q2GLaRcZTFbDs3G6SgVLKFZYCqDwCmd2u'),
  //   })
  // )

  builder = builder.add(
    delegateAuthorityItemV1(umi, {
      mint: nftMint.publicKey,
      authority: umi.identity,
      delegate: new PublicKey('GpjDzFpdim6q2GLaRcZTFbDs3G6SgVLKFZYCqDwCmd2u'),
      tokenStandard: TokenStandard.NonFungible,
    })
  )

  // console.log('--> Added removeAuthority instruction')
  // builder = builder.add(
  //   removeAuthority(umi, {
  //     inscriptionMetadataAccount,
  //   })
  // )

  console.log('--> Added transferV1 instruction')
  builder = builder.add(
    transferV1(umi, {
      mint: nftMint.publicKey,
      tokenOwner: umi.identity.publicKey,
      destinationOwner: new PublicKey('GpjDzFpdim6q2GLaRcZTFbDs3G6SgVLKFZYCqDwCmd2u'),
    })
  )

  // builder = builder.add(
  //   updateAsAuthorityItemDelegateV2(umi, {
  //     mint: nftMint.publicKey,
  //     authority: umi.identity,
  //     newUpdateAuthority: new PublicKey('GpjDzFpdim6q2GLaRcZTFbDs3G6SgVLKFZYCqDwCmd2u'),
  //     isMutable: false,
  //   })
  // )

  // ++++++++++++++++++++++++++++++++++++++++++++++++
  console.log('6. Sign all transaction')
  // const sign = await (await builder.send(umi)).toString()

  await builder.sendAndConfirm(umi, { confirm: { commitment: 'finalized' } })

  // console.log(transaction)

  // const feePayer = Keypair.fromSecretKey(
  //   decode('4pqR8ghxC9AGuUwiaP2cyZppgcTBzRLgtGU4XseysrnXE27jh2xtnNQR4K1Ne5Yg7xHbdU7i3bMyEDRVaF9fCNeJ')
  // )
  // const wallet = new NodeWallet(feePayer)
  // // const recoveredTransaction = Transaction.from(Buffer.from(transaction.serializedMessage, 'base64'))
  // const signedTx = await wallet.signTransaction(transaction)

  // const connection = new Connection('https://devnet-rpc.shyft.to?api_key=mODmQtBi3ONsDMgc', 'confirmed')
  // const confirmTransaction = await connection.sendRawTransaction(signedTx.serialize())

  // console.log(confirmTransaction)

  // sendAndConfirm(umi, { confirm: { commitment: 'finalized' } })

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
