// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const session = await auth(); // Récupère la session côté serveur
  const isLoggedIn = !!session;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/auth');
  const isApiRoute = pathname.startsWith('/api');
  const isPublicRoute = 
    pathname === '/' ||
    pathname.startsWith('/compagnies') ||
    pathname.startsWith('/company') ||
    pathname.startsWith('/news') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/services');

  // Si l'utilisateur est connecté et essaie d'accéder à une page d'auth, rediriger vers l'accueil
  if (isLoggedIn && isAuthRoute && pathname !== '/auth/complete-profile') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Si l'utilisateur est connecté mais n'a pas encore défini son type (nouveau via OAuth)
  // et n'est pas déjà sur la page de finalisation, on le force à y aller.
  if (isLoggedIn && !session.user?.type && pathname !== '/auth/complete-profile') {
    return NextResponse.redirect(new URL('/auth/complete-profile', request.url));
  }

  // Si l'utilisateur n'est pas connecté et tente d'accéder à une page protégée
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute && !isApiRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};