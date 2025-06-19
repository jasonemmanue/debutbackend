// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Le rôle de ce middleware est TRES simple : il vérifie juste si un cookie
// de session existe. Il ne touche PAS à la base de données, ce qui résout l'erreur.
export function middleware(request: NextRequest) {
  // Détermine le nom du cookie de session (il change si on utilise un préfixe sécurisé)
  const sessionCookieName = process.env.AUTH_SECRET
    ? `__Secure-authjs.session-token`
    : `authjs.session-token`;

  const sessionCookie = request.cookies.get(sessionCookieName);
  const isLoggedIn = !!sessionCookie; // L'utilisateur est considéré comme connecté si le cookie existe

  const { pathname } = request.nextUrl;

  // Routes d'authentification (/login, /register, etc.)
  const isAuthRoute = pathname.startsWith('/auth');
  
  if (isAuthRoute) {
    // Si l'utilisateur est déjà connecté et essaie d'aller sur /login,
    // on le redirige vers la page d'accueil.
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Sinon, on le laisse accéder à la page de connexion/inscription.
    return NextResponse.next();
  }

  // Si l'utilisateur n'est PAS connecté et essaie d'accéder à une page protégée
  if (!isLoggedIn && pathname !== '/') {
    // On le renvoie vers la page de connexion
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Dans tous les autres cas (utilisateur connecté, ou accédant à la page d'accueil), on le laisse passer.
  return NextResponse.next();
}

// Le matcher applique ce middleware à toutes les routes SAUF celles spécifiées (api, _next, etc.)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};