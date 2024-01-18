// import { useChromeStorageLocal } from 'use-chrome-storage'

import Friend from '@/features/friend'
import Home from '@/features/home'
import Quest from '@/features/quest'
import Squad from '@/features/squad'
import NavigationBar from '@/shared/components/navigation-bar'
import Me from '@/shared/features/me'
import useNavigation from '@/shared/hooks/use-navigation'

const Popup = () => {
  const { tab } = useNavigation()

  // const [value] = useChromeStorageLocal('counterLocal', '')

  // const openAuth = () => {
  //   chrome.tabs.create({ url: chrome.runtime.getURL('src/pages/auth/index.html') })
  // }

  // const openX = () => {
  //   chrome.tabs.create({ url: 'https://twitter.com/heysonha' })
  // }

  return (
    <div className=" relative min-h-[600px] w-[400px] bg-[#F5F5F0]">
      <Me />
      {
        {
          home: <Home />,
          quest: <Quest />,
          friend: <Friend />,
          squad: <Squad />,
        }[tab]
      }

      <NavigationBar />
    </div>
  )
}

export default Popup
