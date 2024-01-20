import { computeAppURL } from '@/shared/utils'

export default function Auth() {
  const openAuth = () => {
    chrome.tabs.create({ url: computeAppURL('auth') })
  }

  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="24" fill="#C5F277" />
        <circle cx="60" cy="32.5195" r="24" fill="#16120F" />
        <path
          d="M84 63.5996C84 69.9648 81.4714 76.0693 76.9706 80.5702C72.4697 85.071 66.3652 87.5996 60 87.5996C53.6348 87.5996 47.5303 85.071 43.0294 80.5702C38.5286 76.0693 36 69.9648 36 63.5996L60 63.5996H84Z"
          fill="#16120F"
        />
        <path
          d="M84 87.5996C84 93.9648 81.4714 100.069 76.9706 104.57C72.4697 109.071 66.3652 111.6 60 111.6C53.6348 111.6 47.5303 109.071 43.0294 104.57C38.5286 100.069 36 93.9648 36 87.5996L60 87.5996H84Z"
          fill="#16120F"
        />
      </svg>

      <button
        onClick={openAuth}
        className="mt-10 h-7 rounded-lg bg-[#16120F] px-5 py-1 text-xs font-medium text-[#F5F5F1]">
        Join Squad X
      </button>
    </section>
  )
}
