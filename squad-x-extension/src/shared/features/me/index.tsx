import { formatAddress } from '@/shared/utils'

import Avatar from './avatar'

export default function Me() {
  return (
    <div className="flex w-full justify-between p-5">
      <div className="flex flex-col">
        <span className="text-base font-semibold text-[#16120F]">@sonhaaa</span>
        <span className="text-xs font-medium text-[#A7A6A2]">
          {formatAddress('4Z6rexkNv7YJ8bK3gjCWgpS15nrmUf9pzD7Xf1o1wjBX')}
        </span>
      </div>
      <Avatar src="" />
    </div>
  )
}
