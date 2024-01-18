export default function Balance() {
  return (
    <div className="rounded-2xl bg-[#E6D6FF] p-5">
      <span className=" text-sm font-medium text-[#16120F]">Vaults</span>
      <div className="mt-1 flex justify-between">
        <span className="text-2xl font-medium text-[#000000af]">$SQUX</span>
        <span className="text-2xl font-semibold text-[#16120F]">1,234,456</span>
      </div>
      <div className="mt-2">
        <button className="h-7 rounded-lg bg-[#16120F] px-5 py-1 text-xs font-medium text-[#F5F5F1]">Donate</button>
      </div>
    </div>
  )
}
