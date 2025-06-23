// /app/api/client/profile/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Utiliser la méthode PATCH est idéal pour une mise à jour partielle
export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse("Non autorisé", { status: 401 });
  }
  
  // On ne met à jour que si l'utilisateur est un stagiaire
  if (session.user.type !== 'stagiaire') {
    return new NextResponse("Action non autorisée pour ce type d'utilisateur", { status: 403 });
  }

  try {
    const body = await request.json();
    const { niveau_etudes, domaine_etudes, competences } = body;

    // Mise à jour de la fiche Stagiaire liée à l'utilisateur connecté
    const updatedStagiaireProfile = await prisma.stagiaire.update({
      where: {
        userId: session.user.id,
      },
      data: {
        niveau_etudes: niveau_etudes,
        domaine_etudes: domaine_etudes,
        competences: competences,
      },
    });

    return NextResponse.json(updatedStagiaireProfile);

  } catch (error) {
    console.error("ERREUR [API_UPDATE_CLIENT_PROFILE]:", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}