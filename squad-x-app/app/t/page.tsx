import React from 'react'
import { getFollowers } from '@/app/actions/get-followers'

export default async function Page() {
  await getFollowers()

  return <div>page</div>
}
