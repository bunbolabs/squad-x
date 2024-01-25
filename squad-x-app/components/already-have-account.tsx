import React from 'react'
import { SQUAD_X_PROGRAM_ADDRESS } from '@/constants'
import { SquadX } from '@/lib/squad-x-idl'
import { dispatchMessage } from '@/utils'
import { Program } from '@coral-xyz/anchor'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button'

export default function AlreadyHaveAccount() {
  const { publicKey } = useWallet()
  const { data: session } = useSession()
  const programId = useMemo(() => new PublicKey(SQUAD_X_PROGRAM_ADDRESS), [])

  const [isExist, setIsExist] = useState(false)
  const router = useRouter()

  const handle = async () => {
    if (!session || !publicKey) return

    try {
      const res = await fetch(`/api/x/details?id=${(session as any).screenName}`)
      const data = await res.json()

      dispatchMessage('SQUAD-X-USER', JSON.stringify({ ...data, address: publicKey.toString() }))

      router.push('/mint')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handle()
  }, [session, publicKey, programId])

  return <Button>Already have an account</Button>
}
