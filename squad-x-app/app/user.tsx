import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { dispatchMessage } from '@/utils'
import { useWallet } from '@solana/wallet-adapter-react'

export default function User() {
  const { data: session } = useSession()
  const { publicKey } = useWallet()

  const send = async () => {
    if (!session || !publicKey) return

    const res = await fetch(`/api/x/details?id=${session.screenName}`)
    const data = await res.json()

    dispatchMessage('SQUAD-X-USER', JSON.stringify({ ...data, address: publicKey.toString() }))
  }

  useEffect(() => {
    send()
  }, [session, publicKey])

  return (
    <div>
      <button
        onClick={() => dispatchMessage('SQUAD-X-USER', JSON.stringify({ ...session, address: publicKey.toString() }))}
      >
        Send
      </button>
    </div>
  )
}
