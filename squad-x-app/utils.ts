export const dispatchMessage = (action: string, data: string) => {
  window.postMessage({ action, data }, '*')
}

export const formatAddress = (address: string, length = 4) => {
  return address.slice(0, length) + '...' + address.slice(-length)
}
