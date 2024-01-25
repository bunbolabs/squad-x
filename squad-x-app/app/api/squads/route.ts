import { db } from '@/drizzle'
import { squads } from '@/drizzle/schema'

export async function GET() {
  const squad = await db.select().from(squads)

  return Response.json({ squad })
}
