import { Calendar } from 'lucide-react'

export default function Quest() {
  return (
    <div className="flex flex-col p-5 pt-0">
      <span className=" text-sm font-semibold text-[#16120F]">Quests</span>

      <section className="mt-4 flex flex-col gap-4 pb-16">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="select-none">
              <div className="relative flex h-full items-center gap-[10px]">
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-[#16120F]">
                  <Calendar className="text-[#F5F5F0]" width={20} />
                  {/* <Shield className="text-[#F5F5F0]" width={20} /> */}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#16120F]">Retweet 1 friend tweet</span>
                  <span className="text-xs font-normal text-[#A7A6A2]">Son Ha Nguyen</span>
                </div>

                <span className="absolute right-0 top-1 rounded-lg text-sm font-semibold text-[#16120F]">
                  +123 $SQUX
                </span>
                <span className="absolute bottom-2 right-0 rounded-lg text-xs font-medium text-[#A7A6A2]">12/100</span>
              </div>

              <div className="mt-3 h-[1px] w-full rounded-xl bg-[#E5E5D6]"></div>
            </div>
          ))}
      </section>
    </div>
  )
}
