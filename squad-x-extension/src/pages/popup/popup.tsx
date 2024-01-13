const Popup = () => {
  const item = localStorage.getItem('hey')

  const openAuth = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/pages/auth/index.html') })
  }

  return (
    <div className=" min-h-[600px] w-[400px] bg-white">
      <span>Hey</span>
      <span>{item}</span>
      <button onClick={openAuth}>open</button>
    </div>
  )
}

export default Popup
