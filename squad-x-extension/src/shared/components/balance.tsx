import { useEffect, useState } from 'react'
import { useChromeStorageSync } from 'use-chrome-storage'

import { shyft } from '@/services/shyft'
import { SQUAD_X_TOKEN_MINT } from '@/shared/constants'
import { User } from '@/shared/types/user'

// interface Props {}

export default function Balance() {
  const [balance, setBalance] = useState<number>(0)
  const [user] = useChromeStorageSync<User>('SQUAD-X-USER')
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
    <div className="rounded-2xl bg-[#16120F] p-5">
      <span className=" text-sm text-[#F5F5F0]">Your Balance</span>
      <div className="mt-1 flex justify-between">
        <span className="text-2xl font-medium text-[#f5f5f0a9]">$SQUX</span>
        <span className="text-2xl font-semibold text-[#F5F5F0]">{loading && balance.toLocaleString('en-US')}</span>
      </div>
      <div className="mt-2">
        <div className="h-7 w-[120px] rounded-lg bg-[#C5F277]"></div>
      </div>
    </div>
  )
}
