import { db } from '@/drizzle'
import { users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: Request, { params }: { params: { address: string } }) {
  const { address } = params
  const user = await db.select().from(users).where(eq(users.address, address))

  if (user.length === 0) {
    return Response.json({})
  }

  return Response.json(user)
}
