// /app/(dashboard)/company/internships/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ManageInternshipsClient from "./ManageInternshipsClient"; 
import { notFound } from "next/navigation";

export default async function ManageInternshipsPage() {
  const session = await auth();

  if (!session?.user || (session.user.type !== 'entreprise' && session.user.type !== 'employe')) {
    redirect('/auth/login');
  }

  const companyProfile = await prisma.entreprise.findUnique({
    where: { userId: session.user.id },
  });

  if (!companyProfile) {
    redirect('/auth/complete-profile');
  }
  
  const internshipOffers = await prisma.stage.findMany({
    where: {
      entrepriseId: companyProfile.id,
    },
    include: {
      _count: {
        select: { demandes: true },
      },
    },
    orderBy: {
      date_debut: 'desc',
    },
  });

  // [MODIFIÉ] La requête inclut maintenant les détails du profil du stagiaire
  const applications = await prisma.demandeStage.findMany({
    where: {
      stage: { entrepriseId: companyProfile.id },
    },
    include: {
        stagiaire: {
            // On sélectionne les champs spécifiques du profil stagiaire
            select: {
                niveau_etudes: true,
                domaine_etudes: true,
                competences: true,
                user: { // On garde le nom et l'email de l'utilisateur
                    select: {
                        name: true,
                        email: true,
                    }
                }
            }
        }
    }
  });

  return (
    <div className="container mx-auto py-8">
      <ManageInternshipsClient 
          initialOffers={internshipOffers} 
          initialApplications={applications} 
      />
    </div>
  );
}