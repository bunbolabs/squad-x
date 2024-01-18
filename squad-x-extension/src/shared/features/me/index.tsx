import { useChromeStorageLocal } from 'use-chrome-storage'

import { User } from '@/shared/types/user'
import { formatAddress } from '@/shared/utils'

import Avatar from './avatar'

export default function Me() {
  const [user] = useChromeStorageLocal<User>('SQUAD-X-USER')

  return (
    <div className="flex w-full justify-between p-5">
      {user ? (
        <>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-[#16120F]">@{user.screenName}</span>
            <span className="text-xs font-medium text-[#A7A6A2]">{formatAddress(user.address)}</span>
          </div>
          <Avatar src={user.picture} />
        </>
      ) : null}
    </div>
  )
}
