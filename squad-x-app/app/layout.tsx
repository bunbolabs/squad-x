import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

import WalletAdapter from '@/components/wallet-adapter'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Squad X',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WalletAdapter>{children}</WalletAdapter>
        </ThemeProvider>
      </body>
    </html>
  )
}
