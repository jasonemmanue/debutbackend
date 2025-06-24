// /app/api/companies/top-ranked/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Étape 1 : Récupérer toutes les entreprises avec les informations de l'utilisateur associé.
    const companies = await prisma.entreprise.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    // Étape 2 : Pour chaque entreprise, compter le nombre d'abonnés (followers).
    const companiesWithFollowerCount = await Promise.all(
      companies.map(async (company) => {
        const followerCount = await prisma.follow.count({
          where: {
            entrepriseId: company.id,
          },
        });
        return {
          ...company,
          followerCount,
        };
      })
    );

    // Étape 3 : Trier le tableau résultant en JavaScript.
    companiesWithFollowerCount.sort((a, b) => {
      // Tri principal : par nombre d'abonnés, ordre décroissant.
      if (b.followerCount !== a.followerCount) {
        return b.followerCount - a.followerCount;
      }
      // Tri secondaire (en cas d'égalité) : par nom d'entreprise, ordre alphabétique.
      return (a.user.name || '').localeCompare(b.user.name || '');
    });

    // Étape 4 : Formater les données pour une réponse propre et robuste au client.
    const formattedCompanies = companiesWithFollowerCount.map(c => {
      const companyName = c.user.name || 'Inconnu';
      
      const logoUrl = c.logo 
        ? c.logo 
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName.charAt(0))}&background=E0E7FF&color=3730A3`;

      return {
        id: c.id,
        name: companyName,
        logo: logoUrl,
        sector: c.secteur_activite || 'Secteur non défini',
        followerCount: c.followerCount,
      };
    });

    return NextResponse.json(formattedCompanies);

  } catch (error) {
    console.error('[API_TOP_RANKED_COMPANIES_ERROR]', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P1001') {
          return new NextResponse("Impossible de se connecter à la base de données.", { status: 500 });
      }
    }

    return new NextResponse("Erreur interne du serveur lors de la récupération du classement.", { status: 500 });
  }
}
