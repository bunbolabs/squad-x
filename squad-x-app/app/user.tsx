import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { dispatchMessage } from '@/utils'
import { useWallet } from '@solana/wallet-adapter-react'

export default function User() {
  const { data: session } = useSession()
  const { publicKey } = useWallet()

  useEffect(() => {
    if (!session || !publicKey) return

    dispatchMessage('SQUAD-X-USER', JSON.stringify({ ...session, address: publicKey.toString() }))
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
