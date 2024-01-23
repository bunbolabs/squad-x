import Dino from '@/shared/components/dino'
import { type Dino as DinoType } from '@/shared/types/dino'

interface Props {
  dino: DinoType
}

export default function DinoZone(props: Props) {
  return (
    <div className="relative flex h-[300px] items-center justify-center rounded-2xl bg-[#16120F] p-5">
      {props.dino && (
        <>
          <div className="absolute bottom-3 left-3 z-10 rounded-lg border-[1px] border-[#73665E] bg-[#2F2823] px-3 py-1">
            <span className="text-base text-white ">XP: {props.dino.xp}</span>
          </div>

          <div className="absolute right-3 top-3 z-10 rounded-lg border-[1px] border-[#73665E] bg-[#2F2823] px-3 py-1">
            <span className="text-base text-white ">#{props.dino.rank}</span>
          </div>
          <Dino scale={8} name={props.dino.dino} />
        </>
      )}
    </div>
  )
}
