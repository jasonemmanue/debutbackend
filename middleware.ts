// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Détermine le nom du cookie de session
  const sessionCookieName = process.env.AUTH_SECRET
    ? `__Secure-authjs.session-token`
    : `authjs.session-token`;

  const sessionCookie = request.cookies.get(sessionCookieName);
  const isLoggedIn = !!sessionCookie;
  const { pathname } = request.nextUrl;

  // Définition des routes publiques (accessibles sans connexion)
  const isPublicRoute = 
    pathname === '/' ||
    pathname.startsWith('/compagnies') ||
    pathname.startsWith('/company') ||
    pathname.startsWith('/news') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/services');

  // Définition des routes d'authentification
  const isAuthRoute = pathname.startsWith('/auth');

  // 1. Si l'utilisateur est connecté et va sur une page d'authentification, on le redirige vers l'accueil.
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. Si la route est publique ou d'authentification, on laisse passer.
  if (isPublicRoute || isAuthRoute) {
    return NextResponse.next();
  }

  // 3. Si la route n'est ni publique ni d'authentification, ET que l'utilisateur n'est pas connecté,
  // on le redirige vers la page de connexion.
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // 4. Si l'utilisateur est connecté et accède à une page protégée, on le laisse passer.
  return NextResponse.next();
}

// Le matcher applique ce middleware à toutes les routes SAUF celles spécifiées.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};