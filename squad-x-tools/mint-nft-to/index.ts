import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import { Network, ShyftSdk } from '@shyft-to/js'
import { Connection, Keypair, Transaction, clusterApiUrl, sendAndConfirmTransaction } from '@solana/web3.js'
import { decode } from 'bs58'
import fetch from 'node-fetch'
import fs from 'fs'

const SHYFT_API_KEY = 'Sw2YO3HEAiNUHQct'

export const shyft = new ShyftSdk({ apiKey: SHYFT_API_KEY, network: Network.Devnet })

const SECRET = decode('54DRp1AzmPDRKoUdisauCESpZcEP2mn4kzdyTLSpuzKVMNjmBJbXjF4BczzAkwJP8QSrLGTtmmuE6LbKXXDq5WQH')
const AUTHORITY = Keypair.fromSecretKey(SECRET)

const handle = async () => {
  // const res = await shyft.nft.createV2({

  //   // metadataUri: 'https://gateway.pinata.cloud/ipfs/QmdXMFdDsLHDzHKuP9yyeDKzVUHXsTPhLmwiqotEDAsRAb',
  //   // maxSupply: 1,
  //   // collectionAddress: 'jgd9Z4DwsfQXzHkfrPQ7WBhZqpFgSnBkqgQefFjpR3M',
  //   // receiver: 'C8gHzybRCNuLrMBsXW45n9TEmovrTVLTUaMPvWvNts6u',
  //   // feePayer: AUTHORITY.publicKey.toString(),
  // })

  const imageBytes: Buffer = await fs.promises.readFile('/Users/ha.nguyen/bunbolabs/squad-x/squad-x-tools/doux.jpg')

  var raw = JSON.stringify({
    network: 'devnet',
    wallet: AUTHORITY.publicKey.toString(),
    name: 'TEST SHYFT',
    symbol: 'TH',
    description: 'asdkfjhgqhwbelkjahds;fliou;',
    attributes: '[{"trait_type":"dev power","value":"over 900"}]',
    external_url: 'https://shyft.to',
    max_supply: '0',
    royalty: '0',
    file: new File([imageBytes], 'doux.jpg', { type: 'image/jpeg' }),
    nft_receiver: 'C8gHzybRCNuLrMBsXW45n9TEmovrTVLTUaMPvWvNts6u',
  })

  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': SHYFT_API_KEY,
    },
    body: raw,
    redirect: 'follow',
  }

  const res = await fetch('https://api.shyft.to/sol/v1/nft/create_detach', requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result)
    })
    .catch((error) => console.log('error', error))

  console.log(res.encoded_transaction)

  const tx = await confirmTransactionFromBackend(
    res.encoded_transaction,
    '54DRp1AzmPDRKoUdisauCESpZcEP2mn4kzdyTLSpuzKVMNjmBJbXjF4BczzAkwJP8QSrLGTtmmuE6LbKXXDq5WQH'
  )

  console.log(tx)
}

export async function confirmTransactionFromBackend(encodedTransaction, privateKey) {
  const connection = new Connection('https://devnet-rpc.shyft.to?api_key=mODmQtBi3ONsDMgc', 'confirmed')
  const feePayer = Keypair.fromSecretKey(decode(privateKey))
  const wallet = new NodeWallet(feePayer)
  const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, 'base64'))
  const signedTx = await wallet.signTransaction(recoveredTransaction)
  const confirmTransaction = await connection.sendRawTransaction(signedTx.serialize())
  return confirmTransaction
}

handle()
