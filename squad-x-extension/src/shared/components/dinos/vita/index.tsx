interface Props {
  scale?: number
}

export default function Vita({ scale = 1 }: Props) {
  return (
    <div
      className='dino dino-idle h-[24px] w-[24px] bg-[url("https://kzcrnvmbqviqohszvotu.supabase.co/storage/v1/object/public/dinos/DinoSprites%20-%20vita.png")]'
      style={{
        transform: `scale(${scale})`,
      }}></div>
  )
}
