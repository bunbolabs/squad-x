import { useChromeStorageLocal } from 'use-chrome-storage'

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
  const [user] = useChromeStorageLocal<User>('SQUAD-X-USER')

  return (
    <div className=" relative min-h-[600px] w-[400px] bg-[#F5F5F0]">
      {!user ? (
        <Auth />
      ) : (
        <>
          <Me info={user} />
          {
            {
              home: <Home />,
              quest: <Quest />,
              friend: <Friend />,
              squad: <Squad user={user} />,
            }[tab]
          }

          <NavigationBar />
        </>
      )}
    </div>
  )
}

export default Popup
