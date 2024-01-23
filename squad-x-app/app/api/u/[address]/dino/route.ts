import { db } from '@/drizzle'
import { dinos } from '@/drizzle/schema'

export async function POST(request: Request, { params }: { params: { address: string } }) {
  const { address } = params
  const { address: dinoAddress, dino, rank } = await request.json()

  const dinoRow = await db.insert(dinos).values({ user: address, address: dinoAddress, dino, rank }).returning()

  return Response.json({ dino: dinoRow })
}
