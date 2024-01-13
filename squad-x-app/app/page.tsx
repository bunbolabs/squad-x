'use client'

import { useState } from 'react'

export default function Home() {
  const [now, setNow] = useState('')
  const send = () => {
    const n = new Date().toISOString()
    setNow(n)
    var data = { type: 'FROM_PAGE', text: n }

    window.postMessage(data, '*')
  }

  return (
    <main>
      <h1>{now}</h1>
      <button onClick={send}>send</button>
    </main>
  )
}
