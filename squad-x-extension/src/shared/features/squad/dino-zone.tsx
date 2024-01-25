import { useEffect, useState } from 'react'

import Dino from '@/shared/components/dino'
import { User } from '@/shared/types/user'
import { computeAppURL } from '@/shared/utils'
import { type Dino as DinoType } from '@/types/dino'

interface Props {
  members: User[]
}

export default function DinoZone(props: Props) {
  return (
    <div className="flex h-[150px] items-center justify-center rounded-2xl bg-[#16120F] p-5">
      {props.members &&
        props.members.length > 0 &&
        props.members.map(m => <FetchDino key={m.address} owner={m.address} />)}
    </div>
  )
}

const FetchDino = ({ owner }: { owner: string }) => {
  const [dino, setDino] = useState<DinoType>()

  useEffect(() => {
    const fetchDino = async () => {
      const response = await fetch(computeAppURL(`/api/u/${owner}/dino/`))
      const data = await response.json()

      setDino(data.dino)
    }

    fetchDino()
  }, [])

  return dino ? <Dino scale={2} name={dino.dino} /> : <></>
}
