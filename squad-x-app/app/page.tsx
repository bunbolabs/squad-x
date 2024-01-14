'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { Rettiwt } from 'rettiwt-api'

export default function Home() {
  const { publicKey } = useWallet()
  const rettiwt = new Rettiwt({
    apiKey:
      'a2R0PUU5cnRNNFpqczBXaWxpT2I4VkhNQVlCQkt0TVRZdGJVWTFLUHVCWWc7dHdpZD0idT0xNzA1NDcyNjE2NTc0OTU5NjE2IjtjdDA9YTM1OTNhNmRhMGUxMjFmNTNlNDU1MmEwOTg4MGZkMGI7YXV0aF90b2tlbj0yZTUxNjgyZmI2NGM3YTJkNzc5YTA1MWViNTdlOTMwNjZmNTA4OGQ3Ow==',
    logging: true,
    proxyUrl: new URL('https://cors-anywhere.herokuapp.com/'),
  })

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
    <main>
      <button onClick={get}>Get</button>
    </main>
  )
}
