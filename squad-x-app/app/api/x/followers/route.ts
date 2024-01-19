import { rettiwt } from '@/services/rettiwt'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') || ''

  const res = await rettiwt.user.followers(id)

  return Response.json(res)
}
