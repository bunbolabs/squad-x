import '../injected.css'

import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useChromeStorageSync } from 'use-chrome-storage'

import { FOODS } from '@/shared/constants'
import { Inventory } from '@/shared/types/inventory'
import { User } from '@/shared/types/user'
import { computeAppURL, computeAssetURL } from '@/shared/utils'

type Position = {
  x: number
  y: number
}

export default function ClaimableItems() {
  const displayZoneRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>()
  const [food, setFood] = useState('')
  const cap = useRef(_.random(2, 10))
  const [count, setCount] = useState(0)
  const [itemName, setItemName] = useState('')
  const [item, setItem] = useState('')

  const [user] = useChromeStorageSync<User>('SQUAD-X-USER')
  const [inventory, setInventory] = useChromeStorageSync<Inventory>('SQUAD-X-INVENTORY')

  const newFood = () => {
    const { width, height } = displayZoneRef.current.getBoundingClientRect()

    const food = _.sample(FOODS)

    setFood(food)
    setItemName(food)
    setPosition({
      x: _.random(0, width),
      y: _.random(0, height),
    })
    setCount(count + 1)
  }

  const newDino = () => {
    const { width, height } = displayZoneRef.current.getBoundingClientRect()

    setPosition({
      x: _.random(0, width),
      y: _.random(0, height),
    })
    setItemName('dino')
    setCount(count + 1)
  }

  const reset = () => {
    setCount(0)
    setFood('')
    setItemName('')
    setPosition(undefined)
  }

  const spawnItem = () => {
    const item = _.sample(['token', 'food', 'food', 'food', 'food'])

    setItem(item)

    if (item === 'token') {
      newDino()
    }

    if (item === 'food') {
      newFood()
    }
  }

  useEffect(() => {
    spawnItem()
  }, [])

  const claim = async () => {
    if (count >= cap.current) {
      reset()

      return
    }

    if (item === 'token') {
      reset()
      const response = await fetch(computeAppURL(`api/token/${user.address}/claim`), {
        method: 'POST',
      })

      await response.json()
      spawnItem()

      return
    }

    if (item === 'food') {
      if (!inventory) {
        setInventory({ foods: 1 })
      } else {
        setInventory(inventory => ({ ...inventory, foods: inventory.foods + 1 }))
      }
    }

    spawnItem()
  }

  return (
    <div className="claimable-items">
      <div ref={displayZoneRef} className="display-zone">
        {position && item && (
          <button
            onClick={claim}
            className="item bounce"
            style={{
              left: position.x,
              top: position.y,
            }}>
            <img
              className="h-20 w-20"
              src={computeAssetURL(`assets/claimable-items/${itemName}.png`)}
              alt={food.toUpperCase()}
            />
          </button>
        )}
      </div>
    </div>
  )
}
