// /app/api/company/applications/[id]/status/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { StatutDemande } from "@prisma/client";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (session?.user?.type !== 'entreprise') {
    return new NextResponse("Non autorisé", { status: 401 });
  }

  try {
    const { status }: { status: StatutDemande } = await request.json();
    const applicationId = params.id;

    if (!status || !['accepte', 'refuse', 'en_attente'].includes(status)) {
        return new NextResponse("Statut invalide", { status: 400 });
    }
    
    // TODO: Ajouter une vérification pour s'assurer que l'entreprise qui fait la requête
    // est bien celle qui a posté le stage.

    const updatedApplication = await prisma.demandeStage.update({
        where: { id: applicationId },
        data: { statut: status }
    });

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("ERREUR [API_UPDATE_APPLICATION_STATUS]:", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}