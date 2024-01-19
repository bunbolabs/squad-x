'use client'

import { SessionProvider } from 'next-auth/react'

export default function Home() {
  return (
    <SessionProvider>
      <h1>hi</h1>
    </SessionProvider>
  )
}
