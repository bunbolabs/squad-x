'use client'

import { SessionProvider, signIn } from 'next-auth/react'
import User from '../user'

export default function Home() {
  return (
    <SessionProvider>
      <main>
        <button>
          <button onClick={() => signIn()}>Sign in</button>
        </button>
        <User />
      </main>
    </SessionProvider>
  )
}
