interface Props {
  src: string
}

export default function Avatar(props: Props) {
  return (
    <figure className="h-10 w-10 rounded-lg bg-[#16120F]">
      <img src={props.src} alt="Avatar" />
    </figure>
  )
}
