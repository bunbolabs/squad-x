import { dispatchMessage } from '@/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useMemo } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Program } from '@coral-xyz/anchor'
import { SquadX } from '@/lib/squad-x-idl'
import { PublicKey } from '@solana/web3.js'
import { SQUAD_X_PROGRAM_ADDRESS } from '@/constants'

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
  const programId = useMemo(() => new PublicKey(SQUAD_X_PROGRAM_ADDRESS), [])

  const handle = async () => {
    if (!session || !publicKey || !program) return

    try {
      const res = await fetch(`/api/x/details?id=${(session as any).screenName}`)
      const data = await res.json()

      const [pda] = PublicKey.findProgramAddressSync([Buffer.from('USERS'), publicKey.toBuffer()], programId)
      await program.methods.createUserAccount(data.userName, 'Newbie').accounts({ user: pda }).rpc()

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
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // handle()
  }, [session, publicKey, program, programId])

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

// {/* <>
// {!session ? (
//   <AnimatePresence mode="wait">
//     {publicKey && (
//       <motion.div
//         className="w-full"
//         variants={connectButtonVariants}
//         initial="hide"
//         exit="hide"
//         animate={publicKey ? 'show' : 'hide'}
//       >
//         <Button className="w-full" onClick={() => signIn()}>
//           Connect X
//         </Button>
//       </motion.div>
//     )}
//   </AnimatePresence>
// ) : (
//   <Link href={'/mint'} className="w-full">
//     <Button className="w-full">Catch a Dino</Button>
//   </Link>
// )}
// </> */}
