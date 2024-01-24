import { useEffect, useState } from 'react'
import { useChromeStorageSync } from 'use-chrome-storage'

import Dino from '@/shared/components/dino'
import { type Dino as DinoType } from '@/shared/types/dino'
import { Inventory } from '@/shared/types/inventory'
import { User } from '@/shared/types/user'
import { computeAppURL } from '@/shared/utils'

export default function DinoZone() {
  const [inventory, setInventory] = useChromeStorageSync<Inventory>('SQUAD-X-INVENTORY')
  const [user] = useChromeStorageSync<User>('SQUAD-X-USER')

  const [dino, setDino] = useState<DinoType>()

  useEffect(() => {
    if (!user) return

    const fetchDino = async () => {
      const response = await fetch(computeAppURL(`/api/u/${user.address}/dino/`))

      const data = (await response.json()) as { dino: DinoType }

      setDino(data.dino)
    }

    fetchDino()
  }, [user])

  const feed = async () => {
    const response = await fetch(computeAppURL(`api/dino/${user.address}/feed`), {
      method: 'POST',
      body: JSON.stringify({ amount: inventory.foods }),
    })

    const data = await response.json()

    setDino(data.dino)

    setInventory({ ...inventory, foods: 0 })
  }

  return (
    <div className="relative flex h-[300px] items-center justify-center rounded-2xl bg-[#16120F] p-5">
      {dino && (
        <>
          <div className="absolute bottom-3 left-3 z-10 rounded-lg border-[1px] border-[#73665E] bg-[#2F2823] px-3 py-1">
            <span className="text-base text-white ">XP: {dino.xp}</span>
          </div>

          <div className="absolute right-3 top-3 z-10 rounded-lg border-[1px] border-[#73665E] bg-[#2F2823] px-3 py-1">
            <span className="text-base text-white ">#{dino.rank}</span>
          </div>

          {inventory && inventory.foods > 0 && (
            <button
              onClick={feed}
              className="absolute bottom-3 right-3 z-10 rounded-lg border-[1px] border-[#73665E] bg-[#2F2823] px-3 py-1 hover:bg-[#423b36]">
              <span className="text-base text-white ">Feed {inventory?.foods} foods</span>
            </button>
          )}
          <Dino scale={8} name={dino.dino} />
        </>
      )}
    </div>
  )
}
