// /app/api/search/companies/route.ts

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json([]);
    }

    const companies = await prisma.entreprise.findMany({
      where: {
        raison_sociale: {
          contains: query,
          mode: 'insensitive', // Ignore la casse
        },
      },
      take: 10,
    });

    const followedCompanies = await prisma.follow.findMany({
        where: {
            userId: session.user.id,
            entrepriseId: { in: companies.map(c => c.id) }
        },
        select: {
            entrepriseId: true
        }
    });

    const followedCompaniesIds = new Set(followedCompanies.map(f => f.entrepriseId));

    const results = companies.map(company => ({
        ...company,
        isFollowing: followedCompaniesIds.has(company.id)
    }));
    
    results.sort((a, b) => (a.isFollowing === b.isFollowing) ? 0 : a.isFollowing ? -1 : 1);

    return NextResponse.json(results);

  } catch (error) {
    console.error("[API_SEARCH_COMPANIES_ERROR]", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}