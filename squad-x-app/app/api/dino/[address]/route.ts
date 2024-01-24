import { rettiwt } from '@/services/rettiwt'
import _ from 'lodash'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  const followers = (await rettiwt.user.followers(id)).list
  const following = (await rettiwt.user.following(id)).list
  const friends = _.intersectionBy(followers, following, 'userName')

  return Response.json({ friends, followers })
}
