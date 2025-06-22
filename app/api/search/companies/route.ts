// /app/api/search/companies/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { TypeAbonne } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query || query.trim() === "") {
      return NextResponse.json([]);
    }

    // 1. Chercher dans la table User pour les profils de type entreprise.
    // C'est notre source principale de vérité pour le nom.
    const users = await prisma.user.findMany({
      where: {
        type: TypeAbonne.entreprise,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        // Inclure la fiche entreprise pour avoir l'ID et les autres infos.
        entreprise: true,
      },
      take: 10,
    });

    // 2. Filtrer les utilisateurs qui ont bien une fiche entreprise associée
    const companies = users
      .filter(user => user.entreprise)
      .map(user => ({
        // @ts-ignore - On sait que `entreprise` existe grâce au filter
        id: user.entreprise.id,
        // *** MODIFICATION CLÉ : On utilise user.name comme nom principal ***
        raison_sociale: user.name, // Le nom affiché sera celui de la table User
        // On garde les autres infos de la table Entreprise
        secteur_activite: user.entreprise?.secteur_activite,
        adresse: user.entreprise?.adresse,
      }));

    if (companies.length === 0) {
      return NextResponse.json([]);
    }

    // 3. Vérifier le statut de suivi pour les entreprises trouvées
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

    // 4. Formater les résultats finaux avec le statut 'isFollowing'
    const results = companies.map(company => ({
        ...company,
        isFollowing: followedCompaniesIds.has(company.id)
    }));
    
    // Trier pour afficher les entreprises déjà suivies en premier
    results.sort((a, b) => (b.isFollowing ? 1 : 0) - (a.isFollowing ? 1 : 0));

    return NextResponse.json(results);

  } catch (error) {
    console.error("[API_SEARCH_COMPANIES_ERROR]", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}