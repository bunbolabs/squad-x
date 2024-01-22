import { getDino } from '@/lib/utils'
import { mintNft } from '@/services/crossmint'
import { shyft } from '@/services/shyft'
import _ from 'lodash'

export async function POST(request: Request) {
  const { destination } = await request.json()

  // const res = await shyft.nft.

  const dino = getDino(Math.floor(Math.random() * 1000))
  const damage = _.random(80, 100)
  const energy = _.random(90, 100)

  const res = await mintNft({
    name: `${_.capitalize(dino)} #${_.random(1000, 9999)}`,
    description: 'Rawwwwww',
    damage,
    energy,
    recipient: destination,
    dino,
  })

  return Response.json(res)
}
