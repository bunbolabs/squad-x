import './injected.css'

import { useEffect, useState } from 'react'

import { SOLANA_ECOSYSTEMS } from '@/shared/constants'

import ClaimableItems from './claimable-items'
import MessageManager from './message-manager'

export default function App() {
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    const url = window.location.origin

    // console.log(url)

    if (SOLANA_ECOSYSTEMS.includes(url)) {
      setAvailable(true)
    }
  }, [])

  return (
    <div className="injected">
      <MessageManager />

      {available && <ClaimableItems />}
    </div>
  )
}
