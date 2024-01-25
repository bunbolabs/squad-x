import { useEffect, useState } from 'react'
import { useChromeStorageSync } from 'use-chrome-storage'

import { SOLANA_ECOSYSTEMS } from '@/shared/constants'
import { User } from '@/shared/types/user'

import ClaimableItems from './claimable-items'

export default function App() {
  const [available, setAvailable] = useState(false)

  const [, setValue] = useChromeStorageSync<User>('SQUAD-X-USER')

  console.log('******')

  useEffect(() => {
    window.addEventListener('message', function (event) {
      if (event.source != window) return

      if (event.data.action && event.data.action == 'SQUAD-X-USER') {
        const user = JSON.parse(event.data.data) as User

        setValue(user)
      }
    })
  }, [setValue])

  useEffect(() => {
    const url = window.location.origin

    if (SOLANA_ECOSYSTEMS.includes(url)) {
      setAvailable(true)
    }
  }, [])

  return <div className="injected">{available && <ClaimableItems />}</div>
}
