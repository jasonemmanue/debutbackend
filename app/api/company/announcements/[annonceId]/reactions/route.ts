// app/api/announcements/[annonceId]/reactions/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { TypeReactionEnum } from "@prisma/client";

// POST pour ajouter ou retirer une réaction
export async function POST(request: Request, { params }: { params: { annonceId: string } }) {
    const session = await auth();
    if (!session?.user?.id) {
        return new NextResponse("Non autorisé", { status: 401 });
    }

    try {
        const { type_reaction }: { type_reaction: TypeReactionEnum } = await request.json();
        const { annonceId } = params;
        const abonneId = session.user.id;

        const existingReaction = await prisma.reactionAnnonce.findFirst({
            where: { annonceId, abonneId }
        });

        if (existingReaction) {
            // Si la réaction est la même, on la supprime (toggle off)
            if (existingReaction.type_reaction === type_reaction) {
                await prisma.reactionAnnonce.delete({ where: { id: existingReaction.id } });
            } else { // Sinon, on la met à jour
                await prisma.reactionAnnonce.update({
                    where: { id: existingReaction.id },
                    data: { type_reaction }
                });
            }
        } else { // Si pas de réaction existante, on la crée
            await prisma.reactionAnnonce.create({
                data: { annonceId, abonneId, type_reaction }
            });
        }
        
        // On renvoie le nouveau compte total de réactions pour l'annonce
        const reactionsCount = await prisma.reactionAnnonce.groupBy({
            by: ['type_reaction'],
            where: { annonceId },
            _count: true
        });

        return NextResponse.json(reactionsCount);

    } catch (error) {
        console.error("ERREUR [API_REACT_ANNOUNCEMENT]:", error);
        return new NextResponse("Erreur interne du serveur", { status: 500 });
    }
}