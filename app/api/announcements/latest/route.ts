// /app/api/announcements/latest/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// S'assure que la route est toujours dynamique et non mise en cache de manière statique.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const announcements = await prisma.annonce.findMany({
      // On ne prend que les 5 annonces les plus récentes.
      take: 5, 
      orderBy: {
        date_publication: 'desc', // Trier par date de publication, la plus récente en premier.
      },
      include: {
        // On inclut les informations sur l'auteur de l'annonce.
        createur: { 
          select: {
            name: true, // Le nom de l'entreprise
            entreprise: { // La relation pour obtenir l'ID et le logo de l'entreprise
              select: {
                id: true,
                logo: true,
              }
            }
          },
        },
      },
    });

    // On formate les données pour qu'elles correspondent à ce que le composant attend.
    const formattedAnnouncements = announcements.map(ann => {
        const companyName = ann.createur.name || 'Entreprise';
        // Utilise le logo de l'entreprise, ou un avatar de secours si le logo n'existe pas.
        const logo = ann.createur.entreprise?.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName.charAt(0))}&background=E0E7FF&color=3730A3`;

        return {
            id: ann.id,
            title: ann.titre,
            company: companyName,
            // Tronque l'extrait pour qu'il ne soit pas trop long.
            excerpt: ann.contenu ? ann.contenu.substring(0, 100) + '...' : '',
            image: logo, // L'image du carrousel sera le logo de l'entreprise.
            companyId: ann.createur.entreprise?.id,
            date: ann.date_publication
        }
    });

    return NextResponse.json(formattedAnnouncements);
  } catch (error) {
    console.error('[API_LATEST_ANNOUNCEMENTS_ERROR]', error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}
