import { useWallet } from '@solana/wallet-adapter-react'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { dispatchMessage } from '@/utils'

const connectButtonVariants: Variants = {
  hide: {
    opacity: 0,
    y: -5,
  },
  show: {
    opacity: 1,
    y: 0,
  },
}

export default function SignInX() {
  const { publicKey } = useWallet()
  const { data: session } = useSession()

  const [status, setStatus] = useState('')

  const handle = async () => {
    if (!session || !publicKey) return

    const res = await fetch(`/api/x/details?id=${(session as any).screenName}`)
    const data = await res.json()

    setStatus('Catching a Dino...')

    const mintRes = await fetch(`/api/dino/mint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destination: publicKey.toString() }),
    })

    const mintData = await mintRes.json()

    console.log(mintData)

    if (mintData) {
      dispatchMessage('SQUAD-X-USER', JSON.stringify({ ...data, address: publicKey.toString() }))
      setStatus('All set 🎉!')
    } else {
      setStatus('Failed to catching')
    }
  }

  useEffect(() => {
    handle()
  }, [session, publicKey])

  return (
    <>
      {!session ? (
        <AnimatePresence mode="wait">
          {publicKey && (
            <motion.div
              className="w-full"
              variants={connectButtonVariants}
              initial="hide"
              exit="hide"
              animate={publicKey ? 'show' : 'hide'}
            >
              <Button className="w-full" onClick={() => signIn()}>
                Connect X
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <span>{status}</span>
      )}
    </>
  )
}
