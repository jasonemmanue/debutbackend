// /auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config"; // On importe la configuration de base

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  // On fusionne la configuration de base avec la configuration spécifique au serveur
  ...authConfig,
  adapter: PrismaAdapter(prisma), // L'adaptateur Prisma est utilisé ici, sur le serveur
  session: { strategy: "database" },
  providers: [
    ...authConfig.providers, // Récupère Google depuis la config de base
    Credentials({
      // Le fournisseur de mot de passe est défini ici car il accède à la BDD
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user || !user.mot_de_passe) return null;
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.mot_de_passe
        );
        if (passwordsMatch) return user;
        return null;
      },
    }),
  ],
});