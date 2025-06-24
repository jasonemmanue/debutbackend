// /app/api/public-search/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyName = searchParams.get("companyName");
    const country = searchParams.get("country");
    const city = searchParams.get("city");

    const whereClause: any = {
      user: {
        type: 'entreprise',
      },
    };

    if (companyName) {
      whereClause.user = {
        ...whereClause.user,
        name: {
          contains: companyName,
          mode: 'insensitive',
        },
      };
    }

    if (country) {
      whereClause.pays = {
        equals: country,
        mode: 'insensitive',
      };
    }

    if (city) {
      whereClause.ville = {
        contains: city,
        mode: 'insensitive',
      };
    }

    const companies = await prisma.entreprise.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      take: 50, // Limite les résultats pour des raisons de performance
    });

    return NextResponse.json(companies);

  } catch (error) {
    console.error("[API_PUBLIC_SEARCH_ERROR]", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}