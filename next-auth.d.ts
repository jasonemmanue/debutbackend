// next-auth.d.ts

import type { TypeAbonne } from "@prisma/client";
import { type DefaultSession } from "next-auth";

// Étend le type de base de l'utilisateur de NextAuth
declare module "next-auth" {
  /**
   * Retourné par `auth`, `useSession`, `getSession`
   */
  interface Session {
    user: {
      /** Le rôle de l'utilisateur (peut être null si non défini) */
      type: TypeAbonne | null; // CORRECTION : Autoriser null
      /** L'ID de l'utilisateur dans la base de données */
      id: string;
    } & DefaultSession["user"]; // Conserve les champs par défaut (name, email, image)
  }

  // Vous pouvez aussi étendre le type User si nécessaire
  interface User {
     /** Le rôle de l'utilisateur (peut être null si non défini) */
    type: TypeAbonne | null; // CORRECTION : Autoriser null
  }
}

// Étend le type du token JWT
declare module "next-auth/jwt" {
  interface JWT {
    /** Le rôle de l'utilisateur */
    type: TypeAbonne | null; // CORRECTION : Autoriser null
    /** L'ID de l'utilisateur */
    id: string;
  }
}