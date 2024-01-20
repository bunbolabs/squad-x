import { Rettiwt } from 'rettiwt-api'

export async function POST() {
  const rettiwt = new Rettiwt({
    apiKey:
      'a2R0PXdNQVhZZ2dzT0dNMzdrbXd1UTBjRzN2MWpyVkpEVDgxVVBEQmVHcE87dHdpZD0idT0xNzA1NDcyNjE2NTc0OTU5NjE2IjtjdDA9M2M1ZGVlOTRmMzg3NTRjYWY5NWNiYTc3ZDU4MzEyN2E7YXV0aF90b2tlbj1kNjkyNmI2ZWZlZDE2YWMwOTkwOTdmNThkZWNmNThhYzkwZmUyYzkxOw==',
  })

  const res = await rettiwt.user.details('heysonha')

  return Response.json(res)
}
