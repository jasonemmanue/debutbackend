// /app/(dashboard)/client/profile/page.tsx

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient, Particulier, Stagiaire, Partenaire, TypeAbonne } from "@prisma/client";
import { ClientProfileForm } from './ClientProfileForm'; // Le composant client pour le formulaire

const prisma = new PrismaClient();

// Interface pour structurer les données. Elle est maintenant beaucoup plus précise.
export interface ProfileData {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  type: TypeAbonne | null;
  details: Particulier | Stagiaire | Partenaire | null;
}

export default async function ClientProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/auth/login');
    }
    
    if (session.user.type === 'entreprise' || session.user.type === 'employe') {
        redirect('/company');
    }

    let profileDetails: Particulier | Stagiaire | Partenaire | null = null;
    
    // Récupérer les détails du profil en fonction du type de l'utilisateur
    if (session.user.type === 'particulier') {
        profileDetails = await prisma.particulier.findUnique({ where: { userId: session.user.id } });
    } else if (session.user.type === 'stagiaire') {
        profileDetails = await prisma.stagiaire.findUnique({ where: { userId: session.user.id } });
    } else if (session.user.type === 'partenaire') {
        profileDetails = await prisma.partenaire.findUnique({ where: { userId: session.user.id } });
    }

    // Création de l'objet de données avec une gestion sûre des valeurs `undefined`
    const profileData: ProfileData = {
      id: session.user.id,
      name: session.user.name ?? null,         // CORRIGÉ: undefined -> null
      email: session.user.email ?? null,        // CORRIGÉ: undefined -> null
      image: session.user.image ?? null,        // CORRIGÉ: undefined -> null
      type: session.user.type,
      details: profileDetails,                  // CORRIGÉ: Le type correspond maintenant
    }

    return <ClientProfileForm profile={profileData} />;
}