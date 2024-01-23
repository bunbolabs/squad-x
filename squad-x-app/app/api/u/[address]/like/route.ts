import { db } from '@/drizzle'
import { users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: Request, { params }: { params: { address: string } }) {
  const { address } = params
  const { username, fullName, id } = await request.json()
  const user = await db.select().from(users).where(eq(users.address, address))

  if (user.length === 0) {
    const user = await db.insert(users).values({ address, username, fullName, id }).returning()
    return Response.json({ user: user[0] })
  }

  return Response.json({ user })
}

// export async function GET(request: Request, { params }: { params: { address: string } }) {
//   const { address } = params
//   // const user = await db.select().from(users).where(eq(users.address, address))
//   // console.log(user)

//   const user = await db.query.users.findMany({
//     with: {
//       dino: true,
//     },
//   })
//   return Response.json({ user })
// }
