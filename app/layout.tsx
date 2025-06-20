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
      <head>
        {/* Ajout des balises pour l'icône SVG avec différentes tailles */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo.svg" sizes="any" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="mask-icon" href="/logo.svg" color="#F43F5E" />
      </head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}