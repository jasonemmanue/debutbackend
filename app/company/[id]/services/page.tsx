// /app/company/[id]/services/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Handshake } from "lucide-react";

export default async function CompanyServicesPage({ params }: { params: { id: string } }) {
  
  const company = await prisma.entreprise.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { name: true } },
      prestations: { 
        orderBy: {
          titre: 'asc'
        }
      }
    }
  });

  if (!company || !company.user) {
    notFound();
  }

  const logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.user.name || 'E')}&background=E9D5FF&color=3730A3`;

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex items-center mb-8 border-b pb-6">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 shadow-md">
            <Image src={logoUrl} alt={`${company.user.name} logo`} fill className="object-cover" />
        </div>
        <div>
            <p className="text-sm text-gray-600">Prestations proposées par</p>
            <h1 className="text-3xl font-bold text-gray-800">{company.user.name}</h1>
        </div>
      </div>

      {company.prestations.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {company.prestations.map(prestation => (
            <Card key={prestation.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{prestation.titre}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{prestation.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center bg-gray-50 p-4">
                {/* [CORRIGÉ] Utilisation de .toString() pour afficher le tarif */}
                <p className="text-lg font-semibold text-blue-600">
                  {prestation.tarif?.toString() ?? 'Sur devis'} €
                </p>
                <Button variant="outline">
                    Détails <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-8 mt-8 bg-gray-50">
            <Handshake className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium">Aucune prestation disponible</h3>
            <p className="mt-1 text-sm text-gray-500">
              {company.user.name} n'a publié aucune prestation pour le moment.
            </p>
        </Card>
      )}
    </div>
  );
}
