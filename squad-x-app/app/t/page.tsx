'use client'

import React from 'react'
import { getFollowers } from '@/app/actions/get-followers'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Page() {
  // await getFollowers()

  const loginX = async () => {
    signIn()
  }

  return (
    <div>
      <button onClick={loginX}>Login</button>
    </div>
  )
}