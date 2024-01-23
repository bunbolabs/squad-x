import { db } from '@/drizzle'
import { users } from '@/drizzle/schema'
import { rettiwt } from '@/services/rettiwt'
import { eq } from 'drizzle-orm'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  console.log(id)

  const likes = await rettiwt.user.replies(id)

  return Response.json({ likes })
}
