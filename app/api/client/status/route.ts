// /app/api/client/status/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return new NextResponse("Non autorisé", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    const stageId = searchParams.get('stageId');

    if (!companyId || !stageId) {
        return new NextResponse("Paramètres manquants", { status: 400 });
    }

    const stagiaire = await prisma.stagiaire.findUnique({
        where: { userId: session.user.id }
    });
    
    const isFollowing = await prisma.follow.findUnique({
        where: { userId_entrepriseId: { userId: session.user.id, entrepriseId: companyId } }
    });

    // La requête ci-dessous fonctionne maintenant grâce à la correction du schéma
    const hasApplied = stagiaire ? await prisma.demandeStage.findUnique({
        where: {
            // Cette syntaxe est correcte lorsque @@unique est défini dans le schéma
            stageId_stagiaireId: { 
                stageId: stageId,
                stagiaireId: stagiaire.id 
            }
        }
    }) : null;

    const response = {
        isProfileComplete: !!(stagiaire?.niveau_etudes && stagiaire?.domaine_etudes && stagiaire?.competences),
        isFollowing: !!isFollowing,
        hasApplied: !!hasApplied,
    };

    return NextResponse.json(response);
}