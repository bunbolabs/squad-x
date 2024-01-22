import _ from 'lodash'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  return Response.json({ id })
}
