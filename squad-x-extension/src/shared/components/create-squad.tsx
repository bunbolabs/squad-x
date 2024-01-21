import { Plus } from 'lucide-react'

import { computeAppURL } from '@/shared/utils'

export default function CreateSquad() {
  const openCreateSquad = () => {
    chrome.tabs.create({ url: computeAppURL('squad/create') })
  }

  return (
    <button
      onClick={openCreateSquad}
      className=" mt-4 flex h-[92px] flex-col items-center justify-center rounded-2xl bg-[#E6D6FF] text-[#16120F]">
      <Plus width={20} />
      <span className=" mt-1 text-sm font-medium">Create Squads</span>
    </button>
  )
}
