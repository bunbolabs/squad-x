interface Props {
  src: string
}

export default function Avatar(props: Props) {
  return (
    <figure className="h-10 w-10 overflow-hidden rounded-lg bg-[#16120F]">
      <img src={props.src} alt="Avatar" className="h-full w-full" />
    </figure>
  )
}
