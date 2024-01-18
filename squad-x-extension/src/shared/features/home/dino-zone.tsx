import Dino from '@/shared/components/dino'

export default function DinoZone() {
  return (
    <div className="flex h-[300px] items-center justify-center rounded-2xl bg-[#16120F] p-5">
      <Dino scale={8} name="mort" />
    </div>
  )
}
