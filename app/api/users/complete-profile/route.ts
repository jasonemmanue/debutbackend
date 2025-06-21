// /app/api/users/complete-profile/route.ts
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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

    // Mettre à jour le type de l'utilisateur principal
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { type },
    });

    // Créer l'entrée dans la table correspondante
    if (type === 'entreprise') {
      await prisma.entreprise.create({
        data: {
          userId: session.user.id,
          raison_sociale: profileData.raison_sociale,
          siret: profileData.siret,
          secteur_activite: profileData.secteur_activite,
          telephone: profileData.telephone,
        }
      });
    } else if (type === 'stagiaire') {
       await prisma.stagiaire.create({ data: { userId: session.user.id } });
    } else if (type === 'particulier') {
       await prisma.particulier.create({ data: { userId: session.user.id } });
    }

    return NextResponse.json({ success: true, user: updatedUser });

  } catch (error) {
    console.error("ERREUR LORS DE LA FINALISATION DU PROFIL:", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}