import { useEffect, useState } from 'react'
import { useChromeStorageLocal } from 'use-chrome-storage'

import { shyft } from '@/services/shyft'
import { SQUAD_X_TOKEN_MINT } from '@/shared/constants'
import { User } from '@/shared/types/user'

export default function Balance() {
  const [balance, setBalance] = useState<number>(0)
  const [user] = useChromeStorageLocal<User>('SQUAD-X-USER')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTokenBalance = async () => {
      setLoading(false)
      if (!user) return

      const response = await shyft.wallet.getTokenBalance({
        token: SQUAD_X_TOKEN_MINT,
        wallet: user.address,
      })

      setBalance(response.balance)
      setLoading(true)
    }

    fetchTokenBalance()
  }, [user])

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
