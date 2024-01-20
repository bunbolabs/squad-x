import { useWallet } from '@solana/wallet-adapter-react'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
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

  const send = async () => {
    if (!session || !publicKey) return

    const res = await fetch(`/api/x/details?id=${(session as any).screenName}`)
    const data = await res.json()

    dispatchMessage('SQUAD-X-USER', JSON.stringify({ ...data, address: publicKey.toString() }))
  }

  useEffect(() => {
    send()
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
        <span>All set 🎉!</span>
      )}
    </>
  )
}
