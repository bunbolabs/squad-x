import { useEffect, useState } from 'react'
import { useChromeStorageSync } from 'use-chrome-storage'

import { User } from '@/shared/types/user'
import { computeAppURL, computeXURL } from '@/shared/utils'

export default function Friend() {
  const [user] = useChromeStorageSync<User>('SQUAD-X-USER')
  const [friends, setFriends] = useState<User[]>()

  const [followers, setFollowers] = useState<User[]>()

  const openX = (handle: string) => {
    chrome.tabs.create({ url: computeXURL(handle) })
  }

  const call = async () => {
    const res = await fetch(computeAppURL(`/api/friends/${user?.id}`), {
      method: 'GET',
    })

    const data = await res.json()

    setFriends(data.friends)
    setFollowers(data.followers)
  }

  useEffect(() => {
    user && call()
  }, [user])

  return (
    <div className="p-5 pt-0">
      <span className="text-sm font-semibold text-[#16120F]">Friends</span>

      <section className="mt-4 flex flex-col gap-4 pb-16">
        {friends &&
          friends.length > 0 &&
          friends.map((f, index) => (
            <div key={index} className="select-none">
              <button onClick={() => openX(f.userName)} className="relative flex h-full w-full items-center gap-[10px]">
                <figure className="h-[50px] w-[50px]  rounded-xl">
                  <img className="rounded-xl" alt={`${f.fullName}'s avatar`} src={f.profileImage} />
                </figure>

                <div className="flex flex-col items-start">
                  <span className="text-sx font-semibold text-[#16120F]">@{f.userName}</span>
                  <span className="text-sm font-normal text-[#A7A6A2]">{f.fullName}</span>
                </div>

                <span className="absolute right-0 top-0 rounded-lg bg-[#E6D6FF] px-2 py-0.5 text-xs font-normal text-[#16120F]">
                  Best Friends
                </span>
                <span className="absolute bottom-0 right-0 rounded-lg bg-[#FFD6AD] px-2 py-0.5 text-sm font-medium text-[#16120F]">
                  270 FP
                </span>
              </button>

              <div className="mt-3 h-[1px] w-full rounded-xl bg-[#E5E5D6]"></div>
            </div>
          ))}

        {followers &&
          followers.length > 0 &&
          followers.map((f, index) => (
            <div key={index} className="select-none">
              <button onClick={() => openX(f.userName)} className="relative flex h-full w-full items-center gap-[10px]">
                <figure className="h-[50px] w-[50px]  rounded-xl">
                  <img className="rounded-xl" alt={`${f.fullName}'s avatar`} src={f.profileImage} />
                </figure>

                <div className="flex flex-col items-start">
                  <span className="text-sx font-semibold text-[#16120F]">@{f.userName}</span>
                  <span className="text-sm font-normal text-[#A7A6A2]">{f.fullName}</span>
                </div>

                <span className="absolute right-0 top-0 text-xs font-normal text-[#16120F]">Invite</span>
              </button>

              <div className="mt-3 h-[1px] w-full rounded-xl bg-[#E5E5D6]"></div>
            </div>
          ))}
      </section>
    </div>
  )
}
