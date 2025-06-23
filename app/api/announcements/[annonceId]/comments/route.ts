// app/api/announcements/[annonceId]/comments/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Gère la création d'un nouveau commentaire pour une annonce
export async function POST(request: Request, { params }: { params: { annonceId: string } }) {
    const session = await auth();
    if (!session?.user?.id) {
        return new NextResponse("Non autorisé", { status: 401 });
    }

    try {
        const body = await request.json();
        const { contenu } = body;

        if (!contenu || typeof contenu !== 'string' || contenu.trim() === '') {
            return new NextResponse("Le contenu du commentaire est requis.", { status: 400 });
        }

        const newComment = await prisma.commentaire.create({
            data: {
                contenu: contenu,
                annonceId: params.annonceId,
                abonneId: session.user.id,
            },
            // On inclut les informations de l'auteur pour les renvoyer au client
            // afin de mettre à jour l'interface sans un nouvel appel
            include: {
                abonne: {
                    select: { name: true, email: true }
                }
            }
        });

        return NextResponse.json(newComment, { status: 201 });

    } catch (error) {
        console.error("ERREUR [API_POST_COMMENT]:", error);
        return new NextResponse("Erreur Interne du Serveur", { status: 500 });
    }
}