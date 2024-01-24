import { dispatchMessage } from '@/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Program } from '@coral-xyz/anchor'
import { SquadX } from '@/lib/squad-x-idl'
import { PublicKey } from '@solana/web3.js'
import { SQUAD_X_PROGRAM_ADDRESS } from '@/constants'
import { useRouter } from 'next/navigation'

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

export default function CreateUser({ program }: Props) {
  const { publicKey } = useWallet()
  const { data: session } = useSession()
  const programId = useMemo(() => new PublicKey(SQUAD_X_PROGRAM_ADDRESS), [])

  const [isExist, setIsExist] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!publicKey) return

    const fetchUserAccount = async () => {
      const [pda] = PublicKey.findProgramAddressSync([Buffer.from('USERS'), publicKey.toBuffer()], programId)
      try {
        const userAccount = await program.account.users.fetch(pda.toString())

        setIsExist(true)
      } catch (error) {
        setIsExist(false)
      }
    }

    fetchUserAccount()
  }, [programId, publicKey])

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

      router.push('/mint')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // handle()
  }, [session, publicKey, program, programId])

  return (
    <>
      {!isExist && (
        <Button className="w-full" onClick={() => handle()}>
          Create User
        </Button>
      )}
    </>
  )
}
