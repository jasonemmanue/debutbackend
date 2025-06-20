import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/app/Providers'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'B2B Connect',
  description: "Réseau d'excellence pour les entreprises.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}