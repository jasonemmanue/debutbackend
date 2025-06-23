// app/api/announcements/[annonceId]/reactions/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { TypeReactionEnum } from "@prisma/client";

// Gère l'ajout ou le retrait d'une réaction
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
            where: { annonceId, abonneId, type_reaction }
        });

        if (existingReaction) {
            // Si l'utilisateur clique à nouveau sur le même type de réaction, on la supprime
            await prisma.reactionAnnonce.delete({
                where: { id: existingReaction.id }
            });
            return NextResponse.json({ message: "Réaction retirée" });
        } else {
            // Si l'utilisateur n'a pas réagi de cette manière, on crée la réaction
            await prisma.reactionAnnonce.create({
                data: {
                    annonceId,
                    abonneId,
                    type_reaction,
                }
            });
            return NextResponse.json({ message: "Réaction ajoutée" });
        }

    } catch (error) {
        console.error("ERREUR [API_REACT_ANNOUNCEMENT]:", error);
        return new NextResponse("Erreur Interne du Serveur", { status: 500 });
    }
}