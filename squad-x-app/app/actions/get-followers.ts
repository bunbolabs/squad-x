import { Rettiwt } from 'rettiwt-api'

const rettiwt = new Rettiwt()

export const getFollowers = async () => {
  const res = await rettiwt.user.details('heysonha')

  console.log(res)
}
