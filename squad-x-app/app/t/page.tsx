'use client'

import React from 'react'

export default function Page() {
  const getData = async () => {
    const res = await fetch('/api/x', {
      method: 'POST',
    })

    const data = await res.json()
    console.log(data)
  }

  return (
    <div>
      <button onClick={getData}>Get data</button>
    </div>
  )
}
