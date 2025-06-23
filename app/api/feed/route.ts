// app/api/feed/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return new NextResponse("Non autorisé", { status: 401 });
    }

    try {
        const followedCompanies = await prisma.follow.findMany({
            where: { userId: session.user.id },
            select: { entrepriseId: true }
        });
        const followedCompanyIds = followedCompanies.map(f => f.entrepriseId);

        const companyUsers = await prisma.entreprise.findMany({
            where: { id: { in: followedCompanyIds } },
            select: { userId: true }
        });
        const companyUserIds = companyUsers.map(u => u.userId);

        const feed = await prisma.annonce.findMany({
            where: {
                createurId: { in: companyUserIds }
            },
            include: {
                createur: {
                    select: { name: true }
                },
                reactions: {
                    where: { abonneId: session.user.id }
                },
                // CORRECTION : On inclut maintenant les commentaires
                commentaires: {
                    orderBy: { date_creation: 'asc' },
                    include: {
                        abonne: { // On inclut l'auteur de chaque commentaire
                            select: { name: true, email: true }
                        }
                    }
                },
                _count: {
                    select: { reactions: true, commentaires: true }
                }
            },
            orderBy: { date_publication: 'desc' },
            take: 20
        });

        return NextResponse.json(feed);

    } catch (error) {
        console.error("ERREUR [API_GET_FEED]:", error);
        return new NextResponse("Erreur interne du serveur", { status: 500 });
    }
}