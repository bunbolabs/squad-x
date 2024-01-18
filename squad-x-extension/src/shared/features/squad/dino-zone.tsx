import Dino from '@/shared/components/dino'

export default function DinoZone() {
  return (
    <div className="flex h-[150px] items-center justify-center rounded-2xl bg-[#16120F] p-5">
      <Dino scale={2} name="tard" />
      <Dino scale={2} name="doux" />
    </div>
  )
}
