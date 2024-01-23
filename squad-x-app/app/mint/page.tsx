'use client'
require('@solana/wallet-adapter-react-ui/styles.css')

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useUmi } from '@/hooks/use-umi'
import { getDino } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

import { computeAssetURL } from '@/utils'
import {
  fetchInscriptionMetadata,
  findInscriptionMetadataPda,
  findInscriptionShardPda,
  findMintInscriptionPda,
  initializeAssociatedInscription,
  initializeFromMint,
} from '@metaplex-foundation/mpl-inscription'
import { createNft } from '@metaplex-foundation/mpl-token-metadata'
import { TransactionBuilder, generateSigner, percentAmount } from '@metaplex-foundation/umi'
import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useWallet } from '@solana/wallet-adapter-react'

export default function Page() {
  const { umi } = useUmi()
  const [tokenMint, setTokenMint] = useState('')
  const [dino, setDino] = useState('')
  const [rank, setRank] = useState('')
  const [loading, setLoading] = useState(false)

  const { publicKey } = useWallet()

  const mint = async () => {
    if (!publicKey) return

    setLoading(true)
    const dino = getDino(Math.floor(Math.random() * 1000))

    console.log('1. Create NFT mint')
    const nftMint = generateSigner(umi)

    console.log('NFT Mint: ', nftMint.publicKey.toString())

    console.log('2. Init accounts')
    const inscriptionAccount = findMintInscriptionPda(umi, {
      mint: nftMint.publicKey,
    })
    const inscriptionMetadataAccount = findInscriptionMetadataPda(umi, {
      inscriptionAccount: inscriptionAccount[0],
    })
    const inscriptionShardAccount = findInscriptionShardPda(umi, {
      shardNumber: 0,
    })

    let builder = new TransactionBuilder()

    console.log('--> Added createNft instruction')
    // Create NFT
    builder = builder.add(
      createNft(umi, {
        mint: nftMint,
        name: dino.toUpperCase(),
        symbol: 'DINO',
        uri: `https://kzcrnvmbqviqohszvotu.supabase.co/storage/v1/object/public/dinos/${dino}.json`,
        sellerFeeBasisPoints: percentAmount(0),
        isCollection: false,
      })
    )

    console.log('--> Added initializeFromMint instruction')
    builder = builder.add(
      initializeFromMint(umi, {
        mintAccount: nftMint.publicKey,
        inscriptionShardAccount,
      })
    )

    console.log('--> Added initializeAssociatedInscription instruction')
    builder = builder.add(
      initializeAssociatedInscription(umi, {
        inscriptionAccount: inscriptionAccount,
        associationTag: 'image',
      })
    )

    await builder.sendAndConfirm(umi, { confirm: { commitment: 'finalized' } })

    console.log('----- Finish Inscription')

    console.log('3. Fetching inscription metadata')
    const inscriptionMetadata = await fetchInscriptionMetadata(umi, inscriptionMetadataAccount)
    console.log('   Inscription Metadata', inscriptionMetadataAccount[0].toString())
    console.log('   Inscription number: ', inscriptionMetadata.inscriptionRank.toString())

    setRank(inscriptionMetadata.inscriptionRank.toString())

    await fetch(`/api/u/${publicKey.toString()}/dino`, {
      method: 'POST',
      body: JSON.stringify({
        address: nftMint.publicKey.toString(),
        dino,
        rank: inscriptionMetadata.inscriptionRank.toString(),
      }),
    })

    setTokenMint(nftMint.publicKey.toString())
    setDino(dino)
    setLoading(false)
  }

  return (
    <main className="absolute inset-0 h-screen flex items-center justify-center w-screen bg-black bg-[radial-gradient(#5d5e61_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Catch a Dino</CardTitle>
          <CardDescription>Go catch&apos;em</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-1">
          <AspectRatio
            ratio={16 / 12}
            className=" bg-bottom bg-[url(https://img.freepik.com/free-vector/pixel-art-rural-landscape-background_52683-125379.jpg)] relative items-center justify-center flex rounded-lg"
          >
            {rank && tokenMint ? (
              <div
                className="dino scale-x-[-1] dino-idle h-[24px] w-[24px]"
                style={{
                  transform: `scale(4)`,
                  background: `url(${computeAssetURL(`dinos/DinoSprites%20-%20${dino}.png)`)}`,
                }}
              ></div>
            ) : (
              <>
                <div
                  className="dino absolute left-[40px] top-8 dino-idle h-[24px] w-[24px]"
                  style={{
                    transform: `scale(4)`,
                    background: `url(${computeAssetURL(`dinos/DinoSprites%20-%20mort.png)`)}`,
                  }}
                ></div>

                <div
                  className="dino absolute right-[40px] scale-x-[-1] top-[48px] dino-idle h-[24px] w-[24px]"
                  style={{
                    transform: `scale(3.5) scaleX(-1)`,
                    background: `url(${computeAssetURL(`dinos/DinoSprites%20-%20tard.png)`)}`,
                  }}
                ></div>

                <div
                  className="dino absolute bottom-[36px] scale-x-[-1] dino-idle h-[24px] w-[24px]"
                  style={{
                    transform: `scale(3.5) scaleX(-1)`,
                    background: `url(${computeAssetURL(`dinos/DinoSprites%20-%20doux.png)`)}`,
                  }}
                ></div>

                <div
                  className="dino absolute bottom-[140px] right-[90px] scale-x-[-1] dino-idle h-[24px] w-[24px]"
                  style={{
                    transform: `scale(4) scaleX(-1)`,
                    background: `url(${computeAssetURL(`dinos/DinoSprites%20-%20mort.png)`)}`,
                  }}
                ></div>

                <div
                  className="dino absolute bottom-[100px] left-[90px] scale-x-[-1] dino-idle h-[24px] w-[24px]"
                  style={{
                    transform: `scale(3.75)`,
                    background: `url(${computeAssetURL(`dinos/DinoSprites%20-%20vita.png)`)}`,
                  }}
                ></div>

                <div
                  className="dino absolute bottom-[16px] right-[25px] scale-x-[-1] dino-idle h-[24px] w-[24px]"
                  style={{
                    transform: `scale(3) scaleX(-1)`,
                    background: `url(${computeAssetURL(`dinos/DinoSprites%20-%20doux.png)`)}`,
                  }}
                ></div>

                <div
                  className="dino absolute top-[36px] left-[150px] scale-x-[-1] dino-idle h-[24px] w-[24px]"
                  style={{
                    transform: `scale(2.5)`,
                    background: `url(${computeAssetURL(`dinos/DinoSprites%20-%20tard.png)`)}`,
                  }}
                ></div>

                <div
                  className="dino absolute left-6 bottom-6 dino-idle h-[24px] w-[24px]"
                  style={{
                    transform: `scale(3)`,
                    background: `url(${computeAssetURL(`dinos/DinoSprites%20-%20vita.png)`)}`,
                  }}
                ></div>
              </>
            )}
          </AspectRatio>
          {rank && tokenMint && (
            <div>
              <span className="text-base font-semibold">
                {dino.toUpperCase()} #{rank}
              </span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {rank && tokenMint ? (
            <Link
              className="w-full"
              target="_blank"
              href={`https://inscriptions.metaplex.com/manage/${tokenMint}?env=devnet`}
            >
              <Button className="w-full">You caught {dino.toUpperCase()} 🎉</Button>
            </Link>
          ) : (
            <Button className="w-full" onClick={mint}>
              {loading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
              Catch one
            </Button>
          )}
        </CardFooter>
      </Card>
    </main>
  )
}
