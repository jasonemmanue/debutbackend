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
        return new NextResponse("Données manquantes", { status: 400 });
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
        where: {
          userId_entrepriseId: {
            userId,
            entrepriseId,
          },
        },
      });
      return NextResponse.json({ success: true, message: "Vous ne suivez plus l'entreprise" });
    }

    return new NextResponse("Action non valide", { status: 400 });

  } catch (error) {
    console.error("Erreur lors de l'action de suivi:", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}