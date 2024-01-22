import { createNft } from '@metaplex-foundation/mpl-token-metadata'
import { generateSigner, percentAmount } from '@metaplex-foundation/umi'
import fs from 'fs'
import { File, NFTStorage } from 'nft.storage'
import { createUmi } from './0. setup'

const client = new NFTStorage({
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUxOTc5RjMxYTM1MTIzMmEwNjE4ZTI0MDcxRTJiYTlkMDA4MEI3N2MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwNTkwNjU2NTMzOSwibmFtZSI6InRlc3QifQ.DPZNSacg1MYKGwr1y_V8BhApiKjHtg71ESVTOM6q5G0',
})

const handle = async () => {
  console.log('1. Create Instance of UMI')
  const umi = await createUmi()

  const imageBytes: Buffer = await fs.promises.readFile(
    '/Users/ha.nguyen/bunbolabs/squad-x/squad-x-tools/mint-nft/uploads/doux.jpg'
  )

  console.log('2. Upload metadata')
  const metadata = await client.store({
    name: 'My DINO NFT',
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
}

handle()
