import { useEffect, useState } from 'react'

import { shyft } from '@/services/shyft'
import { SQUAD_X_TOKEN_MINT } from '@/shared/constants'

interface Props {
  address: string
}

export default function Balance(props: Props) {
  const [balance, setBalance] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTokenBalance = async () => {
      setLoading(false)
      if (!props.address) return

      const response = await shyft.wallet.getTokenBalance({
        token: SQUAD_X_TOKEN_MINT,
        wallet: props.address,
      })

      setBalance(response.balance)
      setLoading(true)
    }

    fetchTokenBalance()
  }, [props.address])

  return (
    <div className="rounded-2xl bg-[#E6D6FF] p-5">
      <span className=" text-sm font-medium text-[#16120F]">Vaults</span>
      <div className="mt-1 flex justify-between">
        <span className="text-2xl font-medium text-[#000000af]">$SQUX</span>
        <span className="text-2xl font-semibold text-[#16120F]">{loading && balance.toLocaleString('en-US')}</span>
      </div>
      <div className="mt-2">
        <button className="h-7 rounded-lg bg-[#16120F] px-5 py-1 text-xs font-medium text-[#F5F5F1]">Donate</button>
      </div>
    </div>
  )
}
