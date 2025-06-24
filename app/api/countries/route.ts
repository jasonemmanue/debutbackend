// /app/api/countries/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dbCountriesResult = await prisma.entreprise.findMany({
      select: {
        pays: true,
      },
      distinct: ['pays'],
      where: {
        pays: {
          not: null,
        },
      },
    });

    const dbCountries = dbCountriesResult.map(c => c.pays).filter(p => p) as string[];

    const additionalCountries = [
      "France", "Allemagne", "Royaume-Uni", "Canada", "Chine", 
      "Inde", "Brésil", "Australie", "Afrique du Sud", "Émirats Arabes Unis"
    ];

    const allCountries = [...new Set([...dbCountries, ...additionalCountries])];
    allCountries.sort();

    return NextResponse.json(allCountries);
  } catch (error) {
    console.error("[API_COUNTRIES_ERROR]", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}