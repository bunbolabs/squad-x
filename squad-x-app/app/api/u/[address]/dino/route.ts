import { db } from '@/drizzle'
import { dinos } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: Request, { params }: { params: { address: string } }) {
  const { address } = params
  const { address: dinoAddress, dino, rank } = await request.json()

  const dinoRow = await db.insert(dinos).values({ user: address, address: dinoAddress, dino, rank }).returning()

  return Response.json({ dino: dinoRow })
}

export async function GET(request: Request, { params }: { params: { address: string } }) {
  const { address } = params
  const dino = await db.select().from(dinos).where(eq(dinos.user, address))

  return Response.json({ dino: dino[0] })
}
