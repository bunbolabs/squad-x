import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { WalletReadyState, type WalletName } from '@solana/wallet-adapter-base'
import { useWallet, type Wallet } from '@solana/wallet-adapter-react'
import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react'

export default function WalletList() {
  const { wallets, select, publicKey } = useWallet()
  const [mounted, setMounted] = useState(false)

  const [listedWallets] = useMemo(() => {
    const installed: Wallet[] = []
    const loadable: Wallet[] = []
    const notDetected: Wallet[] = []

    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.NotDetected) {
        notDetected.push(wallet)
      } else if (wallet.readyState === WalletReadyState.Loadable) {
        loadable.push(wallet)
      } else if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet)
      }
    }

    let listed: Wallet[] = []

    if (installed.length) {
      listed = installed
    } else if (loadable.length) {
      listed = loadable
    }

    return [listed]
  }, [wallets])

  const handleWalletClick = useCallback(
    (event: MouseEvent, walletName: WalletName) => {
      select(walletName)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [select]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {mounted &&
        listedWallets.map((wallet) => (
          <Button
            key={wallet.adapter.name}
            onClick={(event) => handleWalletClick(event, wallet.adapter.name)}
            className="space-x-2"
            variant="outline"
          >
            <figure className="w-5 h-5">{Icons[wallet.adapter.name]}</figure>

            <span className="text-sm">{wallet.adapter.name}</span>
          </Button>
        ))}
    </>
  )
}
