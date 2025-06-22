// /app/(dashboard)/client/followed-companies/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { FollowedCompaniesClient } from "./FollowedCompaniesClient";

export default async function FollowedCompaniesPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Récupérer les suivis de l'utilisateur et inclure les détails de l'entreprise associée
  const followed = await prisma.follow.findMany({
    where: { userId: session.user.id },
    include: {
      entreprise: { // Inclure le modèle Entreprise
        include: {
          user: { // *** MODIFICATION CLÉ : Inclure l'utilisateur lié à l'entreprise ***
            select: {
              name: true, // Pour récupérer le nom commercial
            }
          }
        }
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  // Formater les données pour le composant client
  const companies = followed
    .filter(f => f.entreprise && f.entreprise.user) // S'assurer que les données ne sont pas nulles
    .map(f => ({
      id_entreprise: f.entreprise.id, 
      // *** MODIFICATION CLÉ : Utiliser le nom de l'utilisateur comme nom principal ***
      nom_entreprise: f.entreprise.user.name || "Nom inconnu",
      secteur_activite: f.entreprise.secteur_activite || "Non spécifié"
  }));

  return <FollowedCompaniesClient initialCompanies={companies} />;
}