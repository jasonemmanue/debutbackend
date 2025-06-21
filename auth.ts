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
      async authorize(credentials, request: Request) {
        // CORRECTION FINALE : Utilisation d'une garde de type robuste
        // On vérifie que `credentials` existe et que `email` et `password` sont bien des chaînes de caractères.
        if (
          !credentials ||
          typeof credentials.email !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          // Si les types ne sont pas corrects, on ne continue pas.
          return null;
        }

        // Après cette garde, TypeScript sait que `credentials.email` et `credentials.password` sont des `string`.
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.mot_de_passe) {
          return null;
        }
        
        const passwordsMatch = await bcrypt.compare(password, user.mot_de_passe);
        
        if (passwordsMatch) {
          const { mot_de_passe, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
        
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.type = (user as User).type;
      }
      if (trigger === "update" && session?.type) {
        token.type = session.type as TypeAbonne;
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          type: token.type as TypeAbonne,
        },
      };
    },
  },
});