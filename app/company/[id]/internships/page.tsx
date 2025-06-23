// /app/company/[id]/internships/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase } from 'lucide-react';

export default async function CompanyInternshipsPage({ params }: { params: { id: string } }) {
  // 1. Récupérer les détails de l'entreprise pour afficher son nom et son logo
  const company = await prisma.entreprise.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { name: true } },
      // 2. Récupérer en même temps toutes les offres de stage de cette entreprise
      stages: {
        orderBy: {
          // On peut trier par date de création ou de début si ce champ est ajouté
          titre: 'asc'
        }
      }
    }
  });

  // Si l'entreprise n'existe pas, renvoyer une 404
  if (!company || !company.user) {
    notFound();
  }

  // Utilisation d'un placeholder pour le logo, comme sur la page de profil
  const logoUrl = "https://placehold.co/120x120/E9D5FF/3730A3?text=" + (company.user.name?.substring(0, 2).toUpperCase() || "C");

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex items-center mb-8 border-b pb-6">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 shadow-md">
            <Image src={logoUrl} alt={`${company.user.name} logo`} fill className="object-cover" />
        </div>
        <div>
            <p className="text-sm text-gray-600">Offres de stage chez</p>
            <h1 className="text-3xl font-bold text-gray-800">{company.user.name}</h1>
        </div>
      </div>

      {company.stages.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {company.stages.map(offer => (
            <Card key={offer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{offer.titre}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-gray-600 mb-4 h-20">{offer.description}</p>
                {/* Ce lien mène vers la page de détail d'UNE seule offre, que nous avons déjà corrigée */}
                <Link href={`/company/${company.id}/internships/${offer.id}`} passHref>
                  <Button className="w-full">
                    Voir les détails <ArrowRight className="ml-2 h-4 w-4"/>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Affiche un message si l'entreprise n'a aucune offre de stage
        <Card className="text-center p-8 mt-8 bg-gray-50">
            <Briefcase className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium">Aucune offre de stage disponible</h3>
            <p className="mt-1 text-sm text-gray-500">
              {company.user.name} n'a publié aucune offre de stage pour le moment.
            </p>
            <Link href={`/company/${company.id}`}>
                <Button variant="outline" className="mt-6">Retour au profil de l'entreprise</Button>
            </Link>
        </Card>
      )}
    </div>
  );
}