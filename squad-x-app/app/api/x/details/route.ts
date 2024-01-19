import { rettiwt } from '@/services/rettiwt'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') || ''

  const res = await rettiwt.user.details(id)

  return Response.json(res)
}
