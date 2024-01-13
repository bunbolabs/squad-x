import { useChromeStorageLocal } from 'use-chrome-storage'

const Popup = () => {
  const [value] = useChromeStorageLocal('counterLocal', '')

  const openAuth = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/pages/auth/index.html') })
  }

  return (
    <div className=" min-h-[600px] w-[400px] bg-white">
      <span>Hey</span>
      <span>{value}</span>
      <button onClick={openAuth}>open</button>
    </div>
  )
}

export default Popup
