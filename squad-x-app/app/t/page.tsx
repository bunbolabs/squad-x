import React from 'react'
import { getFollowers } from '@/app/actions/get-followers'
import { useSession, signIn, signOut } from 'next-auth/react'

export default async function Page() {
  await getFollowers()

  return <div></div>
}
