// /app/api/company/internships/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.type !== 'entreprise') {
    return new NextResponse("Non autorisé", { status: 401 });
  }

  const companyProfile = await prisma.entreprise.findUnique({
    where: { userId: session.user.id },
  });

  if (!companyProfile) {
    return new NextResponse("Profil entreprise non trouvé", { status: 404 });
  }

  try {
    const body = await request.json();
    const { titre, description, duree_stage, date_debut_prevue, competences_requises, niveau_etude_requis, remunere } = body;

    const newOffer = await prisma.stage.create({
      data: {
        titre,
        description,
        duree_stage,
        date_debut: date_debut_prevue ? new Date(date_debut_prevue) : null,
        competences_requises,
        niveau_etude_requis,
        remunere,
        entrepriseId: companyProfile.id,
      },
    });

    return NextResponse.json(newOffer, { status: 201 });
  } catch (error) {
    console.error("ERREUR [API_CREATE_INTERNSHIP]:", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}