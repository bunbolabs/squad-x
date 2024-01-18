export const dispatchMessage = (action: string, data: string) => {
  window.postMessage({ action, data }, '*')
  console.log(data)
}
