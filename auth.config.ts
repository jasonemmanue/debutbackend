import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  pages: { signIn: "/auth/login" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
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
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.image = user.image;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;