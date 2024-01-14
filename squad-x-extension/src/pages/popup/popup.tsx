import { useChromeStorageLocal } from 'use-chrome-storage'

const Popup = () => {
  const [value] = useChromeStorageLocal('counterLocal', '')

  const openAuth = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/pages/auth/index.html') })
  }

  const openX = () => {
    chrome.tabs.create({ url: 'https://twitter.com/heysonha' })
  }

  return (
    <div className=" min-h-[600px] w-[400px] bg-white">
      <span>Hey</span>
      <span>{value}</span>
      <button onClick={openAuth}>open</button>

      <div>
        <button onClick={openX}>Open @sonhaaa</button>
      </div>
    </div>
  )
}

export default Popup
