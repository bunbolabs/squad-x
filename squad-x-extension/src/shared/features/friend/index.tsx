export default function Friend() {
  return (
    <div className="p-5 pt-0">
      <span className="text-sm font-semibold text-[#16120F]">Friends</span>
      <section className="mt-4">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="mt-3 select-none">
              <div className="relative flex h-full items-center gap-[10px]">
                <figure className="h-[50px] w-[50px] overflow-hidden rounded-xl">
                  <img
                    alt="Avatar"
                    src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                  />
                </figure>

                <div className="flex flex-col">
                  <span className="text-sx font-semibold text-[#16120F]">@heysonha</span>
                  <span className="text-sm font-normal text-[#A7A6A2]">Son Ha Nguyen</span>
                </div>

                <span className="absolute right-0 top-0 rounded-lg bg-[#E6D6FF] px-2 py-0.5 text-xs font-normal text-[#16120F]">
                  Best Friends
                </span>
                <span className="absolute bottom-0 right-0 rounded-lg bg-[#FFD6AD] px-2 py-0.5 text-sm font-medium text-[#16120F]">
                  123 FP
                </span>
              </div>

              <div className="mt-3 h-[1px] w-full rounded-xl bg-[#E5E5D6]"></div>
            </div>
          ))}
      </section>
    </div>
  )
}
