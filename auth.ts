// auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, User, TypeAbonne } from '@prisma/client';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/complete-profile',
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        
        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.mot_de_passe) return null;
        
        const passwordsMatch = await bcrypt.compare(password, user.mot_de_passe);
        
        if (passwordsMatch) return user;
        
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, isNewUser }) {
      if (account?.provider === 'google' && isNewUser) {
        return true; 
      }
      return true;
    },
    
    // CORRECTION APPLIQUÉE ICI
    async jwt({ token, user, trigger, session }) {
      // Si l'utilisateur vient de se connecter, on ajoute ses infos au token
      if (user) {
        token.id = user.id;
        token.type = (user as User).type;
      }

      // Si la session est mise à jour (ex: après la complétion du profil)
      if (trigger === "update" && session?.type) {
        token.type = session.type as TypeAbonne;
      }
      
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.type = token.type as TypeAbonne;
      }
      return session;
    },
  },
});