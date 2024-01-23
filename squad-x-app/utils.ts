import { TransactionBuilder, TransactionBuilderGroup, Umi, signAllTransactions } from '@metaplex-foundation/umi'

export const dispatchMessage = (action: string, data: string) => {
  window.postMessage({ action, data }, '*')
}

export const formatAddress = (address: string, length = 4) => {
  return address.slice(0, length) + '...' + address.slice(-length)
}

export interface PrepareAndSignTxsOptions {
  umi: Umi
  builder: TransactionBuilder
}

export async function prepareAndSignTxs({ umi, builder }: PrepareAndSignTxsOptions) {
  const split = builder.unsafeSplitByTransactionSize(umi)
  const txs = (await new TransactionBuilderGroup(split).setLatestBlockhash(umi)).build(umi)

  const signedTxs = await signAllTransactions(
    txs.map((tx) => ({
      transaction: tx,
      signers: [umi.identity],
    }))
  )

  return signedTxs
}

export function computeAssetURL(url: string) {
  return `https://kzcrnvmbqviqohszvotu.supabase.co/storage/v1/object/public/${url}`
}
