'use client'

import WalletAdapter from '@/components/wallet-adapter'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const { publicKey } = useWallet()

  const [now, setNow] = useState('')
  const send = (data: string) => {
    window.postMessage({ type: 'FROM_PAGE', data }, '*')
    console.log('sent', data)
  }

  useEffect(() => {
    if (publicKey) {
      console.log(publicKey.toString())

      send(publicKey.toString())
    }
  }, [publicKey])

  return (
    <main>
      <h1>{now}</h1>
      {/* <button onClick={send}>send</button> */}
    </main>
  )
}
