'use client'

import SignInX from '@/components/sign-in-x'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import WalletList from '@/components/wallet-list'
import { formatAddress } from '@/utils'
import { AnchorProvider, Program, setProvider } from '@coral-xyz/anchor'
import { AnchorWallet, useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { SessionProvider } from 'next-auth/react'

import AlreadyHaveAccount from '@/components/already-have-account'
import CreateUser from '@/components/create-user'
import { SQUAD_X_PROGRAM_ADDRESS } from '@/constants'
import { IDL } from '@/lib/squad-x-idl'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useMemo, useState } from 'react'

export default function Home() {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const wallet = useAnchorWallet()

  const provider = new AnchorProvider(connection, wallet as unknown as AnchorWallet, {})

  setProvider(provider)

  const programId = useMemo(() => new PublicKey(SQUAD_X_PROGRAM_ADDRESS), [])
  const program = useMemo(() => new Program(IDL, programId), [programId])

  const [isExist, setIsExist] = useState(false)

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

  return (
    <SessionProvider>
      <main className='absolute inset-0 h-screen flex items-center justify-center w-screen bg-black bg-[radial-gradient(#5d5e61_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]'>
        {isExist ? (
          <AlreadyHaveAccount />
        ) : (
          <Card className='w-[400px]'>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl'>Authentication</CardTitle>
              <CardDescription>First you need to connect your wallet!</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              {publicKey ? (
                <span>Gm, {formatAddress(publicKey.toString())}</span>
              ) : (
                <div className='grid grid-cols-2 gap-6'>
                  <WalletList />
                </div>
              )}
              {publicKey && (
                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t' />
                  </div>
                  <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background px-2 text-muted-foreground'>Next</span>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter>
              <SignInX program={program} />
              <CreateUser program={program} />
            </CardFooter>
          </Card>
        )}
      </main>
    </SessionProvider>
  )
}
