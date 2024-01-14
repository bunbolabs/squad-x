import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function User() {
  const { data: session } = useSession()

  console.log(session)

  return <div>user</div>
}
