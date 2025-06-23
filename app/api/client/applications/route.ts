// /app/api/client/applications/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Exporter la fonction POST pour gérer les requêtes de candidature
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse("Non autorisé", { status: 401 });
  }
  
  // On s'assure que l'utilisateur a un profil de stagiaire pour pouvoir postuler
  const stagiaireProfile = await prisma.stagiaire.findUnique({
    where: { userId: session.user.id }
  });

  if (!stagiaireProfile) {
      return new NextResponse("Profil stagiaire non trouvé. Veuillez compléter votre profil.", { status: 403 });
  }

  try {
    const { stageId }: { stageId: string } = await request.json();

    if (!stageId) {
        return new NextResponse("ID du stage manquant", { status: 400 });
    }

    // Création de la demande de stage dans la base de données
    const newApplication = await prisma.demandeStage.create({
        data: {
            stageId: stageId,
            stagiaireId: stagiaireProfile.id,
            // Les champs comme lettre_motivation et cv_path peuvent être ajoutés ici si le formulaire les envoie
        }
    });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error: any) {
    console.error("ERREUR [API_APPLY_INTERNSHIP]:", error);
    // Gère le cas où l'utilisateur a déjà postulé (grâce à la contrainte @@unique)
    if (error.code === 'P2002') {
       return new NextResponse("Vous avez déjà postulé à cette offre.", { status: 409 });
    }
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}