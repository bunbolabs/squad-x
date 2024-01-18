import { useEffect } from 'react'
import { useChromeStorageLocal } from 'use-chrome-storage'

import { User } from '@/shared/types/user'

export default function App() {
  const [, setValue] = useChromeStorageLocal<User>('SQUAD-X-USER')

  useEffect(() => {
    window.addEventListener('message', function (event) {
      if (event.source != window) return

      if (event.data.action && event.data.action == 'SQUAD-X-USER') {
        const user = JSON.parse(event.data.data) as User

        setValue(user)
      }
    })
  }, [])

  return <div className="full-screen"></div>
}
