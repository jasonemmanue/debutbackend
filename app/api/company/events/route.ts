// /app/api/company/events/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST pour créer un nouvel événement
export async function POST(request: Request) {
    const session = await auth();

    // 1. Vérifier si l'utilisateur est connecté et est bien une entreprise
    if (session?.user?.type !== 'entreprise') {
        return new NextResponse("Action non autorisée", { status: 403 });
    }

    try {
        const body = await request.json();
        const {
            titre,
            description,
            date_debut,
            date_fin,
            lieu
        } = body;

        // 2. Valider les données reçues du formulaire
        if (!titre || !description || !date_debut || !date_fin) {
            return new NextResponse("Le titre, la description et les dates sont requis.", { status: 400 });
        }

        // 3. Créer l'événement dans la base de données
        const newEvent = await prisma.evenement.create({
            data: {
                titre: titre,
                description: description,
                date_debut: new Date(date_debut), // Conversion en objet Date
                date_fin: new Date(date_fin),     // Conversion en objet Date
                lieu: lieu,
                createurId: session.user.id, // Lier l'événement à l'utilisateur (l'entreprise)
            }
        });
        
        return NextResponse.json(newEvent, { status: 201 });

    } catch (error) {
        console.error("ERREUR [API_CREATE_EVENT]:", error);
        return new NextResponse("Erreur interne du serveur", { status: 500 });
    }
}