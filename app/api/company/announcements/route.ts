// app/api/company/announcements/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST pour créer une nouvelle annonce
export async function POST(request: Request) {
    const session = await auth();
    if (session?.user?.type !== 'entreprise' && session?.user?.type !== 'employe') {
        return new NextResponse("Non autorisé", { status: 401 });
    }

    try {
        const body = await request.json();
        const { titre, contenu } = body;

        if (!titre || !contenu) {
            return new NextResponse("Le titre et le contenu sont requis", { status: 400 });
        }

        const newAnnouncement = await prisma.annonce.create({
            data: {
                titre,
                contenu,
                createurId: session.user.id,
            }
        });

        return NextResponse.json(newAnnouncement, { status: 201 });

    } catch (error) {
        console.error("ERREUR [API_CREATE_ANNOUNCEMENT]:", error);
        return new NextResponse("Erreur interne du serveur", { status: 500 });
    }
}