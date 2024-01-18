import { useChromeStorageLocal } from 'use-chrome-storage'

import { User } from '@/shared/types/user'
import { computeAppURL } from '@/shared/utils'

export default function Auth() {
  const [value] = useChromeStorageLocal<User>('SQUAD-X-USER')

  const openAuth = () => {
    chrome.tabs.create({ url: computeAppURL('auth') })
  }

  console.log(value)

  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <button onClick={openAuth} className="h-7 rounded-lg bg-[#16120F] px-5 py-1 text-xs font-medium text-[#F5F5F1]">
        Auth
      </button>
    </section>
  )
}
