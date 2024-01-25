import { SQUAD_X_DINO_COLLECTION } from '@/constants'

const CROSSMINT_API_KEY = process.env.CROSSMINT_API_KEY as string

const CROSSMINT_COLLECTION_URL = `https://staging.crossmint.com/api/2022-06-09/collections/`

type CrossmintMintResponse = {
  id: string
  onChain: {
    status: string
    chain: string
  }
  actionId: string
}

interface MintOptions {
  dino: string
  description: string
  name: string
  damage: number
  energy: number
  recipient: string
}

export const mintNft = async (opt: MintOptions) => {
  const data = {
    compressed: false,
    metadata: {
      description: opt.description,
      image: `https://kzcrnvmbqviqohszvotu.supabase.co/storage/v1/object/public/dinos/${opt.dino}.jpg`,
      name: opt.name,
      attributes: [
        { display_type: 'number', trait_type: 'damage', value: opt.damage.toString() },
        { display_type: 'number', trait_type: 'energy', value: opt.energy.toString() },
      ],
    },
    recipient: `solana:${opt.recipient}`,
    reuploadLinkedFiles: true,
  }

  const options = {
    method: 'POST',
    headers: {
      'X-API-KEY': CROSSMINT_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(`${CROSSMINT_COLLECTION_URL}/${SQUAD_X_DINO_COLLECTION}/nfts`, options)

  return (await res.json()) as CrossmintMintResponse
}
