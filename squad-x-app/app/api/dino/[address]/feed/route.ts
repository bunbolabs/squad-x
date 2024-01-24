import { db } from '@/drizzle'
import { dinos } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import _ from 'lodash'

export async function POST(request: Request, { params }: { params: { address: string } }) {
  const address = params.address
  const { amount } = await request.json()

  const dino = await db.select().from(dinos).where(eq(dinos.user, address))

  const dinoRow = await db
    .update(dinos)
    .set({ xp: dino[0].xp + amount * 10 })
    .where(eq(dinos.user, address))
    .returning()

  return Response.json({ dino: dinoRow[0] })
}
