// /app/(dashboard)/client/profile/page.tsx

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient, Particulier, Stagiaire, Partenaire, Employe, TypeAbonne } from "@prisma/client"; // Ajout de Employe
import { ClientProfileForm } from './ClientProfileForm';

const prisma = new PrismaClient();

export interface ProfileData {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  type: TypeAbonne | null;
  details: Particulier | Stagiaire | Partenaire | Employe | null; // Ajout de Employe
}

export default async function ClientProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/auth/login');
    }
    
    // Un employé est maintenant géré comme un client, mais on redirige toujours l'entreprise
    if (session.user.type === 'entreprise') {
        redirect('/company');
    }

    let profileDetails: Particulier | Stagiaire | Partenaire | Employe | null = null;
    
    // Récupérer les détails du profil en fonction du type de l'utilisateur
    if (session.user.type === 'particulier') {
        profileDetails = await prisma.particulier.findUnique({ where: { userId: session.user.id } });
    } else if (session.user.type === 'stagiaire') {
        profileDetails = await prisma.stagiaire.findUnique({ where: { userId: session.user.id } });
    } else if (session.user.type === 'partenaire') {
        profileDetails = await prisma.partenaire.findUnique({ where: { userId: session.user.id } });
    } else if (session.user.type === 'employe') { // AJOUT : cas pour l'employé
        profileDetails = await prisma.employe.findUnique({ where: { userId: session.user.id } });
    }

    const profileData: ProfileData = {
      id: session.user.id,
      name: session.user.name ?? null,
      email: session.user.email ?? null,
      image: session.user.image ?? null,
      type: session.user.type,
      details: profileDetails,
    }

    return <ClientProfileForm profile={profileData} />;
}