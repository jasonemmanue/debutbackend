// /auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  // La page de connexion reste la même
  pages: {
    signIn: "/auth/login",
  },
  // On ne met ici que les providers qui n'ont pas besoin d'un accès direct à la BDD
  // dans le middleware, comme Google.
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // Les callbacks sont essentiels. Ils seront fusionnés dans la configuration finale de auth.ts
  callbacks: {
    // Ce callback est maintenant crucial pour le middleware.
    // Il protège les pages sans essayer d'utiliser Prisma.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      const isPublicRoute = pathname === '/';

      if (isPublicRoute) return true;

      const isAuthRoute = pathname.startsWith('/auth');
      if (isAuthRoute) {
        if (isLoggedIn) return Response.redirect(new URL('/', nextUrl));
        return true;
      }

      if (!isLoggedIn) return false;
      
      return true;
    },
    // Ce callback sera utilisé par auth.ts pour enrichir la session
    // avec les données de la BDD une fois l'authentification serveur réussie.
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.image = user.image;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;