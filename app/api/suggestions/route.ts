// /app/api/suggestions/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const field = searchParams.get("field");
    const query = searchParams.get("query");

    if (!field || !query || query.trim().length < 2) {
      return NextResponse.json([]);
    }

    // CORRECTION : Le tableau est maintenant explicitement typé comme un tableau de chaînes de caractères.
    let suggestions: string[] = [];

    if (field === 'company') {
      const companies = await prisma.user.findMany({
        where: {
          type: 'entreprise',
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        select: {
          name: true,
        },
        take: 5,
      });
      // Le filtre s'assure que nous n'ajoutons pas de valeurs nulles au tableau
      suggestions = companies.map(c => c.name).filter((name): name is string => name !== null);
    } else if (field === 'city') {
      const cities = await prisma.entreprise.findMany({
        where: {
          ville: {
            contains: query,
            mode: 'insensitive',
          },
        },
        distinct: ['ville'],
        select: {
          ville: true,
        },
        take: 5,
      });
      // Le filtre s'assure que nous n'ajoutons pas de valeurs nulles au tableau
      suggestions = cities.map(c => c.ville).filter((ville): ville is string => ville !== null);
    }

    return NextResponse.json(suggestions);

  } catch (error) {
    console.error("[API_SUGGESTIONS_ERROR]", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}