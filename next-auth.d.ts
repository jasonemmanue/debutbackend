import type { TypeAbonne } from "@prisma/client";
import { type DefaultSession } from "next-auth";

// Étend le type de base de l'utilisateur de NextAuth
declare module "next-auth" {
  /**
   * Retourné par `auth`, `useSession`, `getSession`
   */
  interface Session {
    user: {
      /** Le rôle de l'utilisateur (entreprise, particulier, etc.) */
      type: TypeAbonne;
      /** L'ID de l'utilisateur dans la base de données */
      id: string;
    } & DefaultSession["user"]; // Conserve les champs par défaut (name, email, image)
  }

  // Vous pouvez aussi étendre le type User si nécessaire
  interface User {
    type: TypeAbonne;
  }
}

// Étend le type du token JWT
declare module "next-auth/jwt" {
  interface JWT {
    /** Le rôle de l'utilisateur */
    type: TypeAbonne;
    /** L'ID de l'utilisateur */
    id: string;
  }
}