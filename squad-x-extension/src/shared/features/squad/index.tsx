import { SystemProgram } from '@solana/web3.js'
import clsx from 'clsx'
import { Axe } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useChromeStorageSync } from 'use-chrome-storage'

import CreateSquad from '@/shared/components/create-squad'
import { type Squad as SquadType } from '@/shared/types/squad'
import { User } from '@/shared/types/user'
import { computeAppURL } from '@/shared/utils'

import Balance from './balance'
import DinoZone from './dino-zone'

const SQUAD_DATA = [
  {
    name: 'Mad Squad',
    motto: 'I mad, you mad, we mad.',
    members: [
      'https://solanafloor.ams3.cdn.digitaloceanspaces.com/collections/mad-lads.jpg',
      'https://madlads.s3.us-west-2.amazonaws.com/images/4655.png',
      'https://madlads.s3.us-west-2.amazonaws.com/images/8846.png',
    ],
    badge: 'Dreamers',
  },
  {
    name: 'Bonk Bonk',
    motto: 'Bonk the dogs!',
    members: [
      'https://famousfoxes.com/tff/5063.png',
      'https://prodftpserver.blob.core.windows.net/images/default/9494',
    ],
    badge: 'Dogos',
  },
]

export default function Squad() {
  const [user] = useChromeStorageSync<User>('SQUAD-X-USER')

  const [isExisted, setIsExisted] = useState(false)
  const [squad, setSquad] = useState<SquadType>()
  const [members, setMembers] = useState<User[]>([])

  useEffect(() => {
    const fetchSquads = async () => {
      if (!user) return

      const ur = await fetch(computeAppURL(`/api/u/${user.address}`))
      const ud = await ur.json()

      if (ud.user.squad !== SystemProgram.programId.toString()) {
        setIsExisted(true)

        const sr = await fetch(computeAppURL(`/api/squads/${ud.user.squad}`))
        const sd = await sr.json()

        setSquad(sd.squad)
        setMembers(sd.members)
      }
    }

    fetchSquads()
  }, [user])

  return (
    <div className="flex flex-col p-5 pt-0">
      <span className="text-sm font-semibold text-[#16120F]">Squads</span>

      {isExisted ? (
        <div className="mt-4 flex select-none flex-col gap-4">
          <div className="relative flex h-full items-center gap-[10px]">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-[#16120F]">
              <span className="text-sm font-semibold text-[#F5F5F0]">
                <Axe />
              </span>
            </div>

            <div className="flex h-full flex-col justify-between ">
              <div className="flex  gap-1">
                <span className="mb-1 text-xl font-semibold text-[#16120F]">{squad?.name}</span>
              </div>
              <span className="text-xs font-medium text-[#A7A6A2]">{squad?.motto}</span>
            </div>

            <div className="absolute right-0 top-0 flex rounded-lg">
              {members &&
                members.length > 0 &&
                members.slice(0, 4).map((m, index) => (
                  <figure
                    key={index}
                    className={clsx('-ml-2 h-7 w-7 overflow-hidden rounded-full border-[2px] border-[#C5F277]')}>
                    <img src={m.picture} alt="Avatar" />
                  </figure>
                ))}
            </div>
          </div>

          <Balance address={squad?.account} />

          <DinoZone members={members} />
        </div>
      ) : (
        <>
          <CreateSquad />

          <section className="mt-2 pb-16">
            {SQUAD_DATA.map((s, index) => (
              <div key={index} className="mt-3 select-none">
                <div className="relative flex h-full items-center gap-[10px]">
                  <div className="flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-[#16120F] bg-center">
                    <span className="text-sm font-semibold text-[#F5F5F0]">
                      <Axe />
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex gap-1">
                      <span className="text-sm font-semibold text-[#16120F]">{s.name}</span>
                      <span className="rounded-lg bg-[#E6D6FF] px-2 py-0.5 text-xs font-medium text-[#16120F]">
                        {s.badge}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-[#A7A6A2]"> {s.motto}</span>
                  </div>

                  <div className="absolute right-0 top-0 flex rounded-lg">
                    {s.members.map((m, index) => (
                      <figure
                        key={index}
                        className={clsx('-ml-2 h-6 w-6 overflow-hidden rounded-full border-[2px] border-[#C5F277]')}>
                        <img src={m} alt="Avatar" />
                      </figure>
                    ))}
                  </div>
                  <button className="absolute bottom-0 right-0 rounded-lg text-xs font-medium text-[#16120F]">
                    Join
                  </button>
                </div>

                <div className="mt-3 h-[1px] w-full rounded-xl bg-[#E5E5D6]"></div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  )
}
