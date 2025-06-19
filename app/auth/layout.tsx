// /app/auth/layout.tsx

import type React from "react";

export const metadata = {
  title: "Authentification - B2B Connect",
  description: "Connectez-vous ou inscrivez-vous sur B2B Connect.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ce layout hérite de tous les styles et providers du layout racine.
  // Il n'a besoin que de retourner les enfants.
  return <>{children}</>;
}