'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { SessionProvider, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import User from './user'

export default function Home() {
  return (
    <SessionProvider>
      <main>
        <button>
          {/* <a href="/api/auth/login">Log In</a> */}
          <button onClick={() => signIn()}>Sign in</button>
        </button>
        {/* 
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
        </div> */}

        <User />
      </main>
    </SessionProvider>
  )
}
