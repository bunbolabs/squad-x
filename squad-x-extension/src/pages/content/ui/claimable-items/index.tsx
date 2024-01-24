import '../injected.css'

import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'

import { FOODS } from '@/shared/constants'
import { computeAssetURL } from '@/shared/utils'

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

  const newFood = () => {
    const { width, height } = displayZoneRef.current.getBoundingClientRect()

    setFood(_.sample(FOODS))
    setPosition({
      x: _.random(0, width),
      y: _.random(0, height),
    })
    setCount(count + 1)
  }

  const reset = () => {
    setCount(0)
    setFood('')
    setPosition(undefined)
  }

  useEffect(() => {
    newFood()
  }, [])

  const claim = async () => {
    if (count >= cap.current) {
      reset()

      return
    }
    console.log('claiming item')

    newFood()
  }

  return (
    <div className="claimable-items">
      <div ref={displayZoneRef} className="display-zone">
        {position && food && (
          <button
            onClick={claim}
            className="item bounce"
            style={{
              left: position.x,
              top: position.y,
            }}>
            <img src={computeAssetURL(`assets/${food}.png`)} alt={food.toUpperCase()} />
          </button>
        )}
      </div>
    </div>
  )
}
