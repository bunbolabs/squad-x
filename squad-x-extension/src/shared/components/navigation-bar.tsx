import clsx from 'clsx'
import { Home, LandPlot, Shell, UserRound } from 'lucide-react'
import { ReactNode } from 'react'

import useNavigation from '@/hooks/use-navigation'
import { Tab } from '@/types/navigation'

const tabs: { name: Tab; icon: ReactNode }[] = [
  {
    name: 'home',
    icon: <Home width={20} height={20} />,
  },
  {
    name: 'quest',
    icon: <Shell width={20} height={20} />,
  },
  {
    name: 'friend',
    icon: <UserRound width={20} height={20} />,
  },
  {
    name: 'squad',
    icon: <LandPlot width={20} height={20} />,
  },
]

export default function NavigationBar() {
  const { tab, setTab } = useNavigation()

  return (
    <div className="fixed bottom-0 z-[9999] flex w-screen items-center justify-center ">
      <div className="flex gap-3 rounded-t-xl bg-[#e5e5d7ab] p-3 px-5 pb-2 backdrop-blur-md">
        {tabs.map(t => (
          <button
            onClick={() => setTab(t.name)}
            key={t.name}
            className={clsx(
              'rounded-lg  p-[10px] text-[#16120F]',
              tab === t.name ? 'bg-[#C5F277] text-[#16120F]' : 'text-[#9385A5] ',
            )}>
            {t.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
