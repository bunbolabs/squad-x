import { User } from '@/shared/types/user'
import { formatAddress } from '@/shared/utils'

import Avatar from './avatar'

interface Props {
  info: User
}

export default function Me(props: Props) {
  return (
    <div className="flex w-full justify-between p-5">
      {props.info ? (
        <>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-[#16120F]">@{props.info.userName}</span>
            <span className="text-xs font-medium text-[#A7A6A2]">{formatAddress(props.info.address)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Avatar src={props.info.profileImage} />
          </div>
        </>
      ) : null}
    </div>
  )
}
