// app/(dashboard)/company/internships/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ManageInternshipsClient from "./ManageInternshipsClient"; 

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
  
  // CORRECTION 1 : Utilisation de 'demandes' (le nom de la relation) pour le comptage
  const internshipOffers = await prisma.stage.findMany({
    where: {
      entrepriseId: companyProfile.id,
    },
    include: {
      _count: {
        select: { demandes: true }, // CORRIGÉ
      },
    },
    orderBy: {
      date_debut: 'desc',
    },
  });

  const applications = await prisma.demandeStage.findMany({
    where: {
      stage: { entrepriseId: companyProfile.id },
    },
    include: {
        stagiaire: {
            include: { user: true }
        }
    }
  });
  
  // CORRECTION 2 : Utilisation de `offer._count.demandes` et ajout de valeurs par défaut pour les champs manquants
  const formattedOffers = internshipOffers.map(offer => ({
      ...offer,
      date_debut_prevue: offer.date_debut,
      description_stage: offer.description,
      titre_stage: offer.titre,
      candidatures: offer._count.demandes, // CORRIGÉ

      // --- Champs manquants dans votre modèle 'Stage' ---
      // Pour que le code fonctionne, j'ajoute des valeurs par défaut.
      // Pour une solution permanente, vous devriez ajouter ces colonnes à votre table `Stage` dans le fichier `schema.prisma` et lancer `npx prisma migrate dev`.
      duree_stage: "6 mois",
      remunere: true,
      statut: 'active',
      niveau_etude_requis: "Bac+3", // CORRIGÉ : Ajout d'une valeur par défaut
  }));
  
  const formattedApplications = applications.map(app => ({
      id: app.id,
      id_stage: app.stageId,
      candidat: app.stagiaire?.user?.name || 'Candidat Anonyme',
      date: app.date_demande.toISOString(),
      status: app.statut,
      message: "Message à ajouter au modèle si besoin",
      cv: "CV à ajouter au modèle si besoin"
  }));

  return (
    <ManageInternshipsClient 
        initialOffers={formattedOffers} 
        initialApplications={formattedApplications} 
    />
  );
}