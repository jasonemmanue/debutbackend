import type React from "react";

// Ce layout est plus simple, il n'a pas besoin de styles ou de providers
// car il les hérite du layout racine (RootLayout).

export const metadata = {
  title: "Authentification - B2B Connect",
  description: "Connectez-vous ou inscrivez-vous sur B2B Connect.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // On se contente de retourner les pages enfants (login, register, etc.)
  return <>{children}</>;
}