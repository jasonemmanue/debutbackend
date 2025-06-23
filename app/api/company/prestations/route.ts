// /app/api/company/prestations/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST pour créer une nouvelle prestation
export async function POST(request: Request) {
    const session = await auth();
    if (session?.user?.type !== 'entreprise') {
        return new NextResponse("Non autorisé", { status: 401 });
    }

    const companyProfile = await prisma.entreprise.findUnique({
        where: { userId: session.user.id }
    });

    if (!companyProfile) {
        return new NextResponse("Profil entreprise non trouvé", { status: 404 });
    }

    try {
        const body = await request.json();
        const { titre, description, tarif } = body;

        if (!titre || tarif === undefined) {
            return new NextResponse("Le titre et le tarif sont requis", { status: 400 });
        }

        const newPrestation = await prisma.prestation.create({
            data: {
                titre,
                description,
                tarif,
                entrepriseId: companyProfile.id,
            }
        });
        
        return NextResponse.json(newPrestation, { status: 201 });
    } catch (error) {
        console.error("ERREUR [API_CREATE_PRESTATION]:", error);
        return new NextResponse("Erreur interne du serveur", { status: 500 });
    }
}

// DELETE pour supprimer une prestation
export async function DELETE(request: Request) {
    const session = await auth();
    if (session?.user?.type !== 'entreprise') {
        return new NextResponse("Non autorisé", { status: 401 });
    }

    const companyProfile = await prisma.entreprise.findUnique({
        where: { userId: session.user.id }
    });

    if (!companyProfile) {
        return new NextResponse("Profil entreprise non trouvé", { status: 404 });
    }
    
    const { searchParams } = new URL(request.url);
    const prestationId = searchParams.get('id');
    
    if (!prestationId) {
        return new NextResponse("ID de prestation manquant", { status: 400 });
    }

    try {
        // S'assurer que la prestation appartient bien à l'entreprise qui fait la requête
        const prestation = await prisma.prestation.findFirst({
            where: {
                id: prestationId,
                entrepriseId: companyProfile.id
            }
        });

        if (!prestation) {
            return new NextResponse("Prestation non trouvée ou non autorisée", { status: 404 });
        }

        await prisma.prestation.delete({
            where: { id: prestationId }
        });

        return new NextResponse(null, { status: 204 }); // No Content
    } catch (error) {
        console.error("ERREUR [API_DELETE_PRESTATION]:", error);
        return new NextResponse("Erreur interne du serveur", { status: 500 });
    }
}