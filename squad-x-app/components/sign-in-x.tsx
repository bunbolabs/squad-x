import { dispatchMessage } from '@/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

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

  const handle = async () => {
    if (!session || !publicKey) return

    const res = await fetch(`/api/x/details?id=${(session as any).screenName}`)
    const data = await res.json()

    console.log(data)

    await fetch(`/api/u/${publicKey.toString()}`, {
      method: 'POST',
      body: JSON.stringify({
        username: data.userName,
        fullName: data.fullName,
        address: publicKey.toString(),
        id: data.id,
      }),
    })

    dispatchMessage('SQUAD-X-USER', JSON.stringify({ ...data, address: publicKey.toString() }))
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
        <Link href={'/mint'} className="w-full">
          <Button className="w-full">Catch a Dino</Button>
        </Link>
      )}
    </>
  )
}
