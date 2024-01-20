import { useEffect } from 'react'
import { useChromeStorageSync } from 'use-chrome-storage'

import { User } from '@/shared/types/user'

export default function App() {
  const [, setValue] = useChromeStorageSync<User>('SQUAD-X-USER')

  useEffect(() => {
    window.addEventListener('message', function (event) {
      if (event.source != window) return

      if (event.data.action && event.data.action == 'SQUAD-X-USER') {
        const user = JSON.parse(event.data.data) as User

        console.log('user', user)

        setValue(user)
      }
    })
  }, [])

  return <div className="full-screen"></div>
}
