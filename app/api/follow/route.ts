// /app/api/follow/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse("Non autorisé", { status: 401 });
  }

  try {
    const { entrepriseId, action }: { entrepriseId: string; action: 'follow' | 'unfollow' } = await request.json();

    if (!entrepriseId || !action) {
        return new NextResponse("Données manquantes : entrepriseId et action sont requis.", { status: 400 });
    }

    const userId = session.user.id;

    if (action === 'follow') {
      await prisma.follow.create({
        data: {
          userId,
          entrepriseId,
        },
      });
      return NextResponse.json({ success: true, message: "Entreprise suivie" });
    } 
    
    if (action === 'unfollow') {
      await prisma.follow.delete({
        // La suppression se base sur la clé primaire composite
        where: {
          userId_entrepriseId: {
            userId,
            entrepriseId,
          },
        },
      });
      return NextResponse.json({ success: true, message: "Vous ne suivez plus l'entreprise" });
    }

    return new NextResponse("Action non valide. Utilisez 'follow' ou 'unfollow'.", { status: 400 });

  } catch (error) {
    console.error("ERREUR [API_FOLLOW]:", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}