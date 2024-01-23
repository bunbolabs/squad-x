import { NFTStorage } from 'nft.storage'

export const client = new NFTStorage({
  token: process.env.NFT_STORAGE_TOKEN!,
})
