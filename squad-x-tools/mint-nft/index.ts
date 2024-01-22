import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import * as fs from 'fs'
import { decode } from 'bs58'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
  fetchInscriptionMetadata,
  findInscriptionMetadataPda,
  findInscriptionShardPda,
  initialize,
  mplInscription,
  writeData,
  fetchInscription,
  initializeFromMint,
  findMintInscriptionPda,
  fetchInscriptionShard,
  findAssociatedInscriptionAccountPda,
} from '@metaplex-foundation/mpl-inscription'
import { allocate } from '@metaplex-foundation/mpl-inscription'
const imageBytes: Buffer = await fs.promises.readFile(
  '/Users/ha.nguyen/bunbolabs/squad-x/squad-x-tools/mint-nft/uploads/doux.jpg'
)

import {
  TokenStandard,
  createV1,
  fetchDigitalAsset,
  mintV1,
  mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata'

import { createSignerFromKeypair, generateSigner, percentAmount, signerIdentity } from '@metaplex-foundation/umi'
import { fromWeb3JsKeypair } from '@metaplex-foundation/umi-web3js-adapters'
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api'

const ENDPOINT = 'https://devnet-rpc.shyft.to?api_key=mODmQtBi3ONsDMgc'
const SOLANA_CONNECTION = new Connection(ENDPOINT)

const AUTHORITY = Keypair.fromSecretKey(
  decode('58ZqUhn8BXFDRdd3CmHSLVdp64VwuFbTD1gdP3haHYrzZSMYUAmFuoS7wzLp7C9Pahp2NXkUpjBZ9ENFnzwjAzE9')
)

const TOKEN_MINT = new PublicKey('CLh3cHUWiBoRRPkRW3XGx3Acdjn8pUvP7DiH3pcarn9W')

export const ADMIN_WALLET = new NodeWallet(AUTHORITY)

async function inscribe(endpoint: string, authority: Keypair) {
  async function inscribe(endpoint: string, authority: Keypair) {
    // 1. Create Instance of UMI
    console.log('1. Create Instance of UMI')
    const SESSION_HASH = 'QNDEMO' + Math.ceil(Math.random() * 1e9) // Random unique identifier for your session
    const umi = createUmi(endpoint, { httpHeaders: { 'x-session-hash': SESSION_HASH } }).use(mplInscription())
    umi.use(signerIdentity(createSignerFromKeypair(umi, fromWeb3JsKeypair(authority))))

    // 2. Fetch Necessary Account Keys
    console.log('2. Fetching necessary account keys')
    const inscriptionAccount = generateSigner(umi)
    const inscriptionShardAccount = findInscriptionShardPda(umi, { shardNumber: Math.floor(Math.random() * 32) })
    const inscriptionMetadataAccount = await findInscriptionMetadataPda(umi, {
      inscriptionAccount: inscriptionAccount.publicKey,
    })

    // 3. Create Inscription
    console.log('3. Creating inscription')
    const tx = await initialize(umi, {
      inscriptionAccount,
      inscriptionMetadataAccount,
      inscriptionShardAccount,
    })
      .add(
        writeData(umi, {
          inscriptionAccount: inscriptionAccount.publicKey,
          inscriptionMetadataAccount,
          value: Buffer.from(
            'QuickNode Inscriptions Guide' // 👈 Replace this with your inscription data
          ),
          associatedTag: null,
          offset: 0,
        })
      )
      .sendAndConfirm(umi, { confirm: { commitment: 'finalized' } })

    // 4. Fetch Inscription Metadata
    console.log('4. Fetching inscription metadata')
    const inscriptionMetadata = await fetchInscriptionMetadata(umi, inscriptionMetadataAccount)
    console.log('   Inscription', inscriptionAccount.publicKey.toString())
    console.log('   Inscription Metadata', inscriptionMetadataAccount[0].toString())
    console.log('   Inscription number: ', inscriptionMetadata.inscriptionRank.toString())

    // 5. Fetch Inscription
    console.log('5. Fetching inscription')
    const inscription = await fetchInscription(umi, inscriptionAccount.publicKey)
    const text = Buffer.from(inscription).toString('utf8')
    console.log('   Inscription Data:', text)
  }

  inscribe(ENDPOINT, AUTHORITY)
}

inscribe(ENDPOINT, AUTHORITY)
