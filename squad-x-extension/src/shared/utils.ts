export function formatAddress(address: string, length = 6) {
  return `${address.slice(0, length)}...${address.slice(-length)}`
}

export function computeXURL(handle: string) {
  return `https://twitter.com/${handle}`
}

export function computeAppURL(url: string) {
  return `http://localhost:3000/${url}`
}
