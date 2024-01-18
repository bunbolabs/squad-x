export default function Balance() {
  return (
    <div className="rounded-2xl bg-[#16120F] p-5">
      <span className=" text-sm text-[#F5F5F0]">Your Balance</span>
      <div className="mt-1 flex justify-between">
        <span className="text-2xl font-medium text-[#f5f5f0a9]">$SQUX</span>
        <span className="text-2xl font-semibold text-[#F5F5F0]">1,234,456</span>
      </div>
      <div className="mt-2">
        <div className="h-7 w-[120px] rounded-lg bg-[#C5F277]"></div>
      </div>
    </div>
  )
}
