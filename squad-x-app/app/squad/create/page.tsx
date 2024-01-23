'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatAddress } from '@/utils'
import { Label } from '@radix-ui/react-label'
import { useWallet } from '@solana/wallet-adapter-react'
import { useSession } from 'next-auth/react'

export default function Page() {
  const { publicKey } = useWallet()
  const { data: session } = useSession()

  return (
    <main className="absolute inset-0 h-screen flex items-center justify-center w-screen bg-black bg-[radial-gradient(#5d5e61_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
      <Card className="w-[500px] shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create Squad</CardTitle>
          <CardDescription>First you need to connect your wallet!</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Team member</Label>
            <div className="flex items-center justify-between space-x-4">
              {publicKey && session && (
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://source.boringavatars.com/marble/120/${publicKey?.toString()}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
                    />
                    <AvatarFallback>{publicKey?.toString().slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">@{(session as any).screenName}</p>
                    <p className="text-sm text-muted-foreground mt-1">{formatAddress(publicKey?.toString())}</p>
                  </div>
                </div>
              )}
              <Button variant="outline" className="ml-auto">
                Owner
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Squad name</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Motto</Label>
            <Textarea id="description" placeholder="Please include all information relevant to your issue." />
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full">Create Squad</Button>
        </CardFooter>
      </Card>
    </main>
  )
}
