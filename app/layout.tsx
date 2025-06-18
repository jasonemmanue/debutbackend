import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css"; // C'est ici qu'on importe les styles globaux

export const metadata: Metadata = {
  title: "B2B Connect",
  description: "Réseau d'Excellence",
  generator: "v0.dev",
};

// Ce layout est le conteneur principal de TOUTE votre application
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // On récupère la session sur le serveur pour la passer au client
  const session = await auth();

  return (
    <html lang="fr">
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}