// app/api/announcements/[annonceId]/comments/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST pour ajouter un commentaire
export async function POST(request: Request, { params }: { params: { annonceId: string } }) {
    const session = await auth();
    if (!session?.user?.id) {
        return new NextResponse("Non autorisé", { status: 401 });
    }

    try {
        const { contenu } = await request.json();
        if (!contenu) {
            return new NextResponse("Le contenu du commentaire est requis", { status: 400 });
        }

        const newComment = await prisma.commentaire.create({
            data: {
                contenu: contenu,
                annonceId: params.annonceId,
                abonneId: session.user.id,
            },
            include: { // Renvoyer le commentaire avec les infos de l'auteur
                abonne: {
                    select: { name: true, email: true }
                }
            }
        });

        return NextResponse.json(newComment, { status: 201 });

    } catch (error) {
        console.error("ERREUR [API_POST_COMMENT]:", error);
        return new NextResponse("Erreur interne du serveur", { status: 500 });
    }
}