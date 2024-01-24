import Balance from '@/shared/components/balance'

import DinoZone from './dino-zone'

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-5 py-0">
      <Balance />
      <DinoZone />
    </div>
  )
}
