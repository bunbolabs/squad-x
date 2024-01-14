'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { Rettiwt } from 'rettiwt-api'
import { SessionProvider, signIn, signOut } from 'next-auth/react'
import User from './user'

export default function Home() {
  const { publicKey } = useWallet()
  const rettiwt = new Rettiwt({
    apiKey:
      'a2R0PUU5cnRNNFpqczBXaWxpT2I4VkhNQVlCQkt0TVRZdGJVWTFLUHVCWWc7dHdpZD0idT0xNzA1NDcyNjE2NTc0OTU5NjE2IjtjdDA9YTM1OTNhNmRhMGUxMjFmNTNlNDU1MmEwOTg4MGZkMGI7YXV0aF90b2tlbj0yZTUxNjgyZmI2NGM3YTJkNzc5YTA1MWViNTdlOTMwNjZmNTA4OGQ3Ow==',
    logging: true,
    proxyUrl: new URL('https://cors-anywhere.herokuapp.com/'),
  })

  // const { data: session, status } = useSession()

  const send = (data: string) => {
    window.postMessage({ type: 'FROM_PAGE', data }, '*')
    console.log('sent', data)
  }

  useEffect(() => {
    if (publicKey) {
      console.log(publicKey.toString())

      send(publicKey.toString())
    }
  }, [publicKey])

  const get = async () => {
    rettiwt.user
      .details('taroj1205')
      .then((details) => {
        console.log(details)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <SessionProvider>
      <main>
        <button onClick={get}>Get</button>

        <button>
          <a className="button__login" href="/api/auth/login">
            Log In
          </a>
        </button>

        <div>
          <button onClick={() => signIn()}>Sign in</button>
          <button onClick={() => signOut()}>Sign out</button>
        </div>

        <div>
          <a
            href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=NHVHRWhiaGVaWDN4UUlFd2J4MlA6MTpjaQ&redirect_uri=http://localhost:3000/login/callback&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`}
          >
            Sign out
          </a>
        </div>

        <User />
      </main>
    </SessionProvider>
  )
}
