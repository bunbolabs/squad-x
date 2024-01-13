import { useEffect } from 'react'
import { useChromeStorageLocal } from 'use-chrome-storage'

export default function App() {
  const [, setValue] = useChromeStorageLocal('counterLocal', '')

  useEffect(() => {
    window.addEventListener('message', function (event) {
      if (event.source != window) return

      if (event.data.type && event.data.type == 'FROM_PAGE') {
        setValue(event.data.data)
      }
    })
  }, [])

  return <div className="full-screen"></div>
}
