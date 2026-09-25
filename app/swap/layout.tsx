import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const description = 'Swap and bridge tokens across EVM chains and Solana. A live demo of the Awarizon Swap SDK and widget, powered by 0x, Jupiter and LI.FI.'

export const metadata: Metadata = {
  title: 'Swap',
  description,
  openGraph: { title: 'Swap | Awarizon', description },
  twitter: { title: 'Swap | Awarizon', description },
  alternates: { canonical: 'https://awarizon.com/swap' },
}

export default function SwapLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
