import Balance from '@/shared/components/balance'
import Dino from '@/shared/components/dino'

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-5 py-0">
      <Balance />
      <Dino />
    </div>
  )
}
