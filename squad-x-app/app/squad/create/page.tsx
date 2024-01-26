'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatAddress } from '@/utils'
import { AnchorProvider, Program, setProvider } from '@coral-xyz/anchor'
import { Label } from '@radix-ui/react-label'
import { AnchorWallet, useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useSession } from 'next-auth/react'

import { SQUAD_X_PROGRAM_ADDRESS } from '@/constants'
import { IDL } from '@/lib/squad-x-idl'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function Page() {
  const { data: session } = useSession()

  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const wallet = useAnchorWallet()

  const provider = new AnchorProvider(connection, wallet as unknown as AnchorWallet, {})
  setProvider(provider)

  const programId = useMemo(() => new PublicKey(SQUAD_X_PROGRAM_ADDRESS), [])
  const program = useMemo(() => new Program(IDL, programId), [programId])

  const [isJoined, setIsJoined] = useState(false)

  const nameInputRef = useRef<HTMLInputElement>(null)
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!publicKey) return

    const fetchUserAccount = async () => {
      const [pda] = PublicKey.findProgramAddressSync([Buffer.from('USERS'), publicKey.toBuffer()], programId)
      try {
        const userAccount = await program.account.users.fetch(pda.toString())
        console.log(userAccount)

        setIsJoined(userAccount.squad.toString() !== SystemProgram.programId.toString())
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserAccount()
  }, [programId, publicKey])

  const create = async () => {
    if (!publicKey) return
    if (!nameInputRef.current?.value) return
    if (!descriptionInputRef.current?.value) return

    const [squadPda] = PublicKey.findProgramAddressSync([Buffer.from('SQUADS'), publicKey.toBuffer()], programId)
    const [userPda] = PublicKey.findProgramAddressSync([Buffer.from('USERS'), publicKey.toBuffer()], programId)

    try {
      await program.methods
        .createSquad(nameInputRef.current.value, descriptionInputRef.current.value, 'Dreamers')
        .accounts({ user: userPda, squad: squadPda })
        .rpc()

      console.log('Squad created successfully!')
      const response = await fetch(`/api/squads/`, {
        method: 'POST',
        body: JSON.stringify({
          name: nameInputRef.current.value,
          motto: descriptionInputRef.current.value,
          owner: publicKey.toString(),
          account: squadPda.toString(),
          badge: 'Dreamers',
        }),
      })

      setIsJoined(true)
    } catch (error) {
      setIsJoined(false)
    }
  }

  return (
    <main className='absolute inset-0 h-screen flex items-center justify-center w-screen bg-black bg-[radial-gradient(#5d5e61_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]'>
      {isJoined ? (
        <Button>You already joined a Squad</Button>
      ) : (
        <Card className='w-[500px] shadow-2xl'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl'>Create Squad</CardTitle>
            <CardDescription>Embrace your community with exclusive rewards!</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Team member</Label>
              <div className='flex items-center justify-between space-x-4'>
                {publicKey && session && (
                  <div className='flex items-center space-x-4'>
                    <Avatar>
                      <AvatarImage
                        src={`https://source.boringavatars.com/marble/120/${publicKey?.toString()}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
                      />
                      <AvatarFallback>{publicKey?.toString().slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium leading-none'>@{(session as any).screenName}</p>
                      <p className='text-sm text-muted-foreground mt-1'>{formatAddress(publicKey?.toString())}</p>
                    </div>
                  </div>
                )}
                <Button variant='outline' className='ml-auto'>
                  Owner
                </Button>
              </div>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='name'>Squad name</Label>
              <Input ref={nameInputRef} id='name' placeholder='Ex: Dainouces' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>Motto</Label>
              <Textarea ref={descriptionInputRef} id='description' placeholder="Ex: Let's go Dinos" />
            </div>
          </CardContent>

          <CardFooter>
            <Button onClick={create} className='w-full'>
              Create Squad
            </Button>
          </CardFooter>
        </Card>
      )}
    </main>
  )
}
