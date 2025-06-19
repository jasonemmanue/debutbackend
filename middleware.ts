// /middleware.ts

// On importe la configuration principale de NextAuth depuis auth.ts
// C'est cette version qui connaît votre base de données.
import { auth } from "@/auth";

// On exporte directement la fonction 'auth' comme middleware par défaut.
// C'est la nouvelle manière de faire avec NextAuth v5.
export default auth;

// Cette configuration précise les routes qui seront protégées par le middleware.
// Nous la gardons telle quelle.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};