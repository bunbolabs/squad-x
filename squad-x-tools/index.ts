console.log('Hello via Bun!')

import { Rettiwt } from 'rettiwt-api'

const rettiwt = new Rettiwt({
  apiKey:
    'a2R0PUU5cnRNNFpqczBXaWxpT2I4VkhNQVlCQkt0TVRZdGJVWTFLUHVCWWc7dHdpZD0idT0xNzA1NDcyNjE2NTc0OTU5NjE2IjtjdDA9YTM1OTNhNmRhMGUxMjFmNTNlNDU1MmEwOTg4MGZkMGI7YXV0aF90b2tlbj0yZTUxNjgyZmI2NGM3YTJkNzc5YTA1MWViNTdlOTMwNjZmNTA4OGQ3Ow==',
  logging: true,
})

rettiwt.user
  .followers('1441380300043419650')
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
