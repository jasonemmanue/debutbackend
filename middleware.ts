import { auth } from "@/auth"

export default auth

// Le matcher spécifie les routes sur lesquelles le middleware sera appliqué.
// Ceci protège les routes tout en ignorant les routes API, les fichiers statiques, etc.
export const config = {
  matcher: [
    /*
     * Fait correspondre tous les chemins de requête sauf ceux qui commencent par :
     * - api (routes API)
     * - _next/static (fichiers statiques)
     * - _next/image (fichiers d'optimisation d'image)
     * - favicon.ico (fichier favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}