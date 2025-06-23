// /app/api/users/complete-profile/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { TypeAbonne } from "@prisma/client";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return new NextResponse("Non autorisé", { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, ...profileData } = body;

    if (!type) {
      return new NextResponse("Le type de profil est manquant", { status: 400 });
    }

    const userTypeEnum = type as TypeAbonne;

    // Mise à jour du type de l'utilisateur principal
    await prisma.user.update({
      where: { id: session.user.id },
      data: { type: userTypeEnum },
    });

    // Création de la fiche détaillée correspondante
    switch (userTypeEnum) {
      case 'entreprise':
        await prisma.entreprise.create({
          data: {
            userId: session.user.id,
            raison_sociale: profileData.raison_sociale,
            siret: profileData.siret,
            secteur_activite: profileData.secteur_activite,
            adresse: profileData.adresse,
            telephone: profileData.telephone,
          }
        });
        break;
      
      case 'stagiaire':
        await prisma.stagiaire.create({
          data: {
            userId: session.user.id,
            niveau_etudes: profileData.niveau_etudes,
            domaine_etudes: profileData.domaine_etudes,
            competences: profileData.competences,
          }
        });
        break;

      case 'employe':
        // Vérifier que l'entreprise existe grâce à son SIRET
        const company = await prisma.entreprise.findUnique({
          where: { siret: profileData.siret_entreprise }
        });

        if (!company) {
          return new NextResponse("Aucune entreprise trouvée avec ce numéro de SIRET.", { status: 404 });
        }

        await prisma.employe.create({
          data: {
            userId: session.user.id,
            poste: profileData.poste,
            entrepriseId: company.id, // On lie l'employé à l'ID de l'entreprise trouvée
          }
        });
        break;
      
      case 'partenaire':
        await prisma.partenaire.create({
          data: {
            userId: session.user.id,
            type_partenariat: profileData.type_partenariat
          }
        });
        break;
        
      default:
        return new NextResponse("Type de profil invalide", { status: 400 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("ERREUR LORS DE LA FINALISATION DU PROFIL:", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}
