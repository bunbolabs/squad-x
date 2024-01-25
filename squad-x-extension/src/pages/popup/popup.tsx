import { useEffect, useState } from 'react'
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
import { computeAppURL } from '@/shared/utils'

const Popup = () => {
  const { tab } = useNavigation()
  const [user] = useChromeStorageSync<User>('SQUAD-X-USER')

  const [isExisted, setIsExisted] = useState(false)

  useEffect(() => {
    const fetchSquads = async () => {
      if (!user) return

      try {
        const ur = await fetch(computeAppURL(`/api/u/${user.address}`))
        const ud = await ur.json()

        setIsExisted(!!ud.user)
      } catch (error) {
        setIsExisted(false)
      }
    }

    fetchSquads()
  }, [user])

  return (
    <div className=" relative min-h-[600px] w-[400px] bg-[#F5F5F0]">
      {!isExisted ? (
        <Auth />
      ) : (
        <>
          <Me info={user} />
          {
            {
              home: <Home />,
              quest: <Quest />,
              friend: <Friend />,
              squad: <Squad />,
            }[tab]
          }

          <NavigationBar />
        </>
      )}
    </div>
  )
}

export default Popup
