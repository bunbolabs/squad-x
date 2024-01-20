import { useChromeStorageSync } from 'use-chrome-storage'

import Friend from '@/features/friend'
import Home from '@/features/home'
import Quest from '@/features/quest'
import Squad from '@/features/squad'
import NavigationBar from '@/shared/components/navigation-bar'
import Auth from '@/shared/features/auth'
import Me from '@/shared/features/me'
import useNavigation from '@/shared/hooks/use-navigation'
import { User } from '@/shared/types/user'

const Popup = () => {
  const { tab } = useNavigation()
  const [value] = useChromeStorageSync<User>('SQUAD-X-USER')

  return (
    <div className=" relative min-h-[600px] w-[400px] bg-[#F5F5F0]">
      {!value ? (
        <Auth />
      ) : (
        <>
          <Me info={value} />
          {
            {
              home: <Home />,
              quest: <Quest />,
              friend: <Friend />,
              squad: <Squad user={value} />,
            }[tab]
          }

          <NavigationBar />
        </>
      )}
    </div>
  )
}

export default Popup
