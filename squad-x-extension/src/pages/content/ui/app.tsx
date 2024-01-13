import { useEffect } from 'react'
import { useChromeStorageLocal } from 'use-chrome-storage'

export default function App() {
  const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal('counterLocal', '')

  useEffect(() => {
    // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //   console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')
    //   if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' })
    // })

    window.addEventListener('message', function (event) {
      // We only accept messages from ourselves
      if (event.source != window) return

      if (event.data.type && event.data.type == 'FROM_PAGE') {
        chrome.runtime.sendMessage({ greeting: 'hello' })

        setValue(event.data.text)

        console.log('Content script received message: ' + event.data.text)
      }
    })
  }, [])

  return <div className="full-screen"></div>
}
