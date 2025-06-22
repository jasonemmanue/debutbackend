// /app/(dashboard)/client/followed-companies/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { FollowedCompaniesClient } from "./FollowedCompaniesClient"; // Nouveau composant client

export default async function FollowedCompaniesPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const followed = await prisma.follow.findMany({
    where: { userId: session.user.id },
    include: {
      entreprise: {
        select: {
          id: true,
          raison_sociale: true,
          secteur_activite: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  const companies = followed.map(f => ({
      id_entreprise: f.entreprise.id,
      nom_entreprise: f.entreprise.raison_sociale || "Nom inconnu",
      secteur_activite: f.entreprise.secteur_activite || "Non spécifié"
  }));

  return <FollowedCompaniesClient initialCompanies={companies} />;
}