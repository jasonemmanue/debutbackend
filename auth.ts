import NextAuth, { type NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
 
const prisma = new PrismaClient()

// On définit l'objet de configuration avec son type explicite pour plus de sécurité
export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })
        
        if (!user || !user.mot_de_passe) return null
        
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.mot_de_passe
        )
        
        if (passwordsMatch) return user
        
        return null
      },
    }),
  ],
  callbacks: {
    // Ce callback est essentiel quand on utilise l'adaptateur Prisma
    // pour s'assurer que l'ID de l'utilisateur est dans l'objet session.
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  // La stratégie de session par défaut avec un adaptateur est "database", ce qui est correct.
  secret: process.env.AUTH_SECRET,
}

// On exporte les fonctions et gestionnaires en passant l'objet de config
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)