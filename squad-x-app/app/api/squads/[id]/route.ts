import { db } from '@/drizzle'
import { squads, users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  const squad = await db.select().from(squads).where(eq(squads.account, id))
  const members = await db.select().from(users).where(eq(users.squad, id))

  return Response.json({ squad: squad[0], members })
}
