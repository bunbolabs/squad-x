import { rettiwt } from '@/services/rettiwt'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  const likes = await rettiwt.user.likes(id)

  return Response.json({ likes })
}
