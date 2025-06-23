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

    // Utilisation d'une transaction pour garantir que toutes les opérations réussissent ou échouent ensemble
    await prisma.$transaction(async (tx) => {
      // 1. Mettre à jour le type de l'utilisateur.
      // Pour une entreprise, on met aussi à jour le nom public.
      if (userTypeEnum === 'entreprise') {
        if (!profileData.nom_entreprise) {
          throw new Error("Le nom de l'entreprise est requis.");
        }
        await tx.user.update({
          where: { id: session.user.id },
          data: { 
            type: userTypeEnum,
            name: profileData.nom_entreprise // Synchronisation du nom public
          },
        });
      } else {
        await tx.user.update({
          where: { id: session.user.id },
          data: { type: userTypeEnum },
        });
      }
      
      // 2. Créer la fiche détaillée correspondante au type de profil.
      switch (userTypeEnum) {
        case 'entreprise':
          if (!profileData.raison_sociale) {
            throw new Error("La raison sociale est requise.");
          }
          await tx.entreprise.create({
            data: {
              userId: session.user.id,
              raison_sociale: profileData.raison_sociale, // Le nom légal
              siret: profileData.siret,
              secteur_activite: profileData.secteur_activite,
              adresse: profileData.adresse,
              telephone: profileData.telephone,
            }
          });
          break;
        
        case 'stagiaire':
          await tx.stagiaire.create({
            data: {
              userId: session.user.id,
              niveau_etudes: profileData.niveau_etudes,
              domaine_etudes: profileData.domaine_etudes,
              competences: profileData.competences,
            }
          });
          break;

        case 'employe':
          const company = await tx.entreprise.findUnique({
            where: { siret: profileData.siret_entreprise }
          });
          if (!company) {
            throw new Error("Aucune entreprise trouvée avec ce numéro de SIRET.");
          }
          await tx.employe.create({
            data: {
              userId: session.user.id,
              poste: profileData.poste,
              competences: profileData.competences,
              entrepriseId: company.id,
            }
          });
          break;
        
        case 'partenaire':
          await tx.partenaire.create({
            data: {
              userId: session.user.id,
              type_partenariat: profileData.type_partenariat
            }
          });
          break;
          
        case 'particulier':
           await tx.particulier.create({ data: { userId: session.user.id } });
           break;

        default:
          throw new Error("Type de profil invalide");
      }
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("ERREUR LORS DE LA FINALISATION DU PROFIL:", error);
    return new NextResponse(error.message || "Erreur interne du serveur", { status: 500 });
  }
}