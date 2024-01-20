'use client'

import SignInX from '@/components/sign-in-x'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import WalletList from '@/components/wallet-list'
import { formatAddress } from '@/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import { SessionProvider } from 'next-auth/react'

export default function Home() {
  const { publicKey } = useWallet()

  return (
    <SessionProvider>
      <main className="w-screen h-screen flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Authentication</CardTitle>
            <CardDescription>First you need to connect your wallet!</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {publicKey ? (
              <span>Gm, {formatAddress(publicKey.toString())}</span>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                <WalletList />
              </div>
            )}
            {publicKey && (
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Next</span>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <SignInX />
          </CardFooter>
        </Card>
      </main>
    </SessionProvider>
  )
}
