import { Calendar, Shield } from 'lucide-react'

const QUESTS_DATA = [
  {
    name: "Like 10 friend's tweet",
    description: 'Start first impression by like button',
    reward: '10 $SQUX',
    icon: <Calendar className="text-[#F5F5F0]" width={20} />,
  },
  {
    name: 'Collect 10 foods',
    description: "Foods is drop randomly in Solana's ecosystem",
    reward: '5 $SQUX',
    icon: <Calendar className="text-[#F5F5F0]" width={20} />,
  },
  {
    name: 'Feed Dino 20 foods',
    description: 'Dino is starving ~',
    reward: '5 $SQUX',
    icon: <Calendar className="text-[#F5F5F0]" width={20} />,
  },
  {
    name: 'Add 1 friend',
    description: 'More friend, more fun',
    reward: '20 $SQUX',
    icon: <Calendar className="text-[#F5F5F0]" width={20} />,
  },
  {
    name: "Visit 10 friends's X",
    description: 'Keep connecting with your friends',
    reward: '10 $SQUX',
    icon: <Calendar className="text-[#F5F5F0]" width={20} />,
  },
  {
    name: 'Retweet 1 thing about your day',
    description: 'How is your day?',
    reward: '20 $SQUX',
    icon: <Calendar className="text-[#F5F5F0]" width={20} />,
  },
  {
    name: 'Invite 1 friends to join SquadX',
    description: 'More friend, more fun',
    reward: '50 $SQUX',
    icon: <Calendar className="text-[#F5F5F0]" width={20} />,
  },
  {
    name: 'Collect 100 foods',
    description: 'Dino is happy ~',
    reward: '20 $SQUX',
    icon: <Shield className="text-[#F5F5F0]" width={20} />,
  },
  {
    name: 'Dino reach 1000 xp',
    description: 'Dino will evolve ~',
    reward: '10 $SQUX',
    icon: <Shield className="text-[#F5F5F0]" width={20} />,
  },
]

export default function Quest() {
  return (
    <div className="flex flex-col p-5 pt-0">
      <span className=" text-sm font-semibold text-[#16120F]">Quests</span>

      <section className="mt-4 flex flex-col gap-4 pb-16">
        {QUESTS_DATA.map((q, index) => (
          <div key={index} className="select-none">
            <div className="relative flex h-full items-center gap-[10px]">
              <div className="flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-[#16120F]">
                {q.icon}
                {/* <Calendar className="text-[#F5F5F0]" width={20} /> */}
                {/* <Shield className="text-[#F5F5F0]" width={20} /> */}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#16120F]">{q.name}</span>
                <span className="text-xs font-normal text-[#A7A6A2]">{q.description}</span>
              </div>

              <span className="absolute right-0 top-1 rounded-lg text-sm font-semibold text-[#16120F]">
                +{q.reward}
              </span>
              {/* <span className="absolute bottom-2 right-0 rounded-lg text-xs font-medium text-[#A7A6A2]">12/100</span> */}
            </div>

            <div className="mt-3 h-[1px] w-full rounded-xl bg-[#E5E5D6]"></div>
          </div>
        ))}
      </section>
    </div>
  )
}
