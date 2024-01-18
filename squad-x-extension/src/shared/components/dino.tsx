interface Props {
  scale?: number
  name?: string
}

export default function Dino({ scale = 1, name = 'vita' }: Props) {
  return (
    <div
      className="dino dino-idle h-[24px] w-[24px]"
      style={{
        transform: `scale(${scale})`,
        background: `url(https://kzcrnvmbqviqohszvotu.supabase.co/storage/v1/object/public/dinos/DinoSprites%20-%20${name}.png)`,
      }}></div>
  )
}
