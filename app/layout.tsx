// Fichier : app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/app/Providers' // <-- Vérifiez que l'import est correct

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
        {/* Cette ligne est cruciale ! */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}