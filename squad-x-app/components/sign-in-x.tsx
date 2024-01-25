import { SquadX } from '@/lib/squad-x-idl'
import { Program } from '@coral-xyz/anchor'
import { useWallet } from '@solana/wallet-adapter-react'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { signIn, useSession } from 'next-auth/react'
import { Button } from './ui/button'

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

interface Props {
  program: Program<SquadX>
}

export default function SignInX({ program }: Props) {
  const { publicKey } = useWallet()
  const { data: session } = useSession()

  return (
    <>
      {!session && (
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
      )}
    </>
  )
}
