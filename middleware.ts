// /middleware.ts

// On importe la configuration d'authentification PRINCIPALE depuis auth.ts
import { auth } from "@/auth"; 

// La ligne la plus importante :
// On force le middleware à s'exécuter dans l'environnement Node.js
// ce qui lui donne accès à la base de données via Prisma.
export const runtime = "nodejs";

// On utilise directement l'objet 'auth' comme middleware.
// Il contient maintenant toute la logique (base de données, callbacks, etc.)
export default auth;

// La configuration du matcher ne change pas.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};