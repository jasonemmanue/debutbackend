// app/api/comments/[commentId]/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE pour supprimer un commentaire
export async function DELETE(request: Request, { params }: { params: { commentId: string } }) {
    const session = await auth();
    if (!session?.user?.id) {
        return new NextResponse("Non autorisé", { status: 401 });
    }

    try {
        const commentId = params.commentId;
        const comment = await prisma.commentaire.findUnique({
            where: { id: commentId },
            include: { annonce: { select: { createurId: true } } }
        });

        // Vérifier que l'utilisateur qui supprime est bien l'auteur de l'annonce
        if (!comment || comment.annonce.createurId !== session.user.id) {
            return new NextResponse("Action non autorisée", { status: 403 });
        }

        await prisma.commentaire.delete({ where: { id: commentId } });

        return new NextResponse(null, { status: 204 }); // No Content

    } catch (error) {
        console.error("ERREUR [API_DELETE_COMMENT]:", error);
        return new NextResponse("Erreur interne du serveur", { status: 500 });
    }
}