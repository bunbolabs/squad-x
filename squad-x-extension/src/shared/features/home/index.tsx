import { useEffect, useState } from 'react'

import Balance from '@/shared/components/balance'
import { Dino } from '@/shared/types/dino'
import { User } from '@/shared/types/user'
import { computeAppURL } from '@/shared/utils'

import DinoZone from './dino-zone'

interface Props {
  user: User
}

export default function Home(props: Props) {
  const [dino, setDino] = useState<Dino>()

  useEffect(() => {
    if (!props.user) return

    const fetchDino = async () => {
      const response = await fetch(computeAppURL(`/api/u/${props.user.address}/dino/`))

      const data = (await response.json()) as { dino: Dino }

      setDino(data.dino)
    }

    fetchDino()
  }, [props.user])

  return (
    <div className="flex flex-col gap-4 p-5 py-0">
      <Balance />
      <DinoZone dino={dino} />
    </div>
  )
}
