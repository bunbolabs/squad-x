'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { SessionProvider, signIn } from 'next-auth/react'
import { useCallback, useMemo, type MouseEvent } from 'react'
import Image from 'next/image'
import { WalletReadyState, type WalletName } from '@solana/wallet-adapter-base'
import { useWallet, type Wallet } from '@solana/wallet-adapter-react'
import { Icons } from '@/components/icons'

export default function Home() {
  const { wallets, select } = useWallet()

  const [listedWallets] = useMemo(() => {
    const installed: Wallet[] = []
    const loadable: Wallet[] = []
    const notDetected: Wallet[] = []

    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.NotDetected) {
        notDetected.push(wallet)
      } else if (wallet.readyState === WalletReadyState.Loadable) {
        loadable.push(wallet)
      } else if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet)
      }
    }

    let listed: Wallet[] = []

    if (installed.length) {
      listed = installed
    } else if (loadable.length) {
      listed = loadable
    }

    return [listed]
  }, [wallets])

  const handleWalletClick = useCallback(
    (event: MouseEvent, walletName: WalletName) => {
      select(walletName)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [select]
  )

  return (
    <SessionProvider>
      <main className="w-screen h-screen flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Authentication</CardTitle>
            <CardDescription>Enter your email below to create your account</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              {listedWallets.map((wallet) => (
                <Button
                  key={wallet.adapter.name}
                  onClick={(event) => handleWalletClick(event, wallet.adapter.name)}
                  className="space-x-2"
                  variant="outline"
                >
                  <figure className="w-5 h-5">{Icons[wallet.adapter.name]}</figure>

                  <span className="text-sm">{wallet.adapter.name}</span>
                </Button>
              ))}
              {/* <Button variant="outline">
                Github
              </Button>
              <Button variant="outline">
                Google
              </Button> */}
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create account</Button>
          </CardFooter>
        </Card>
      </main>
    </SessionProvider>
  )
}
