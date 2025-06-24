// /app/company/[id]/events/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default async function CompanySpecificEventsPage({ params }: { params: { id: string } }) {
  
  // 1. Récupérer d'abord l'entreprise pour avoir son nom et l'ID de l'utilisateur créateur
  const company = await prisma.entreprise.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { id: true, name: true } }
    }
  });

  if (!company || !company.user) {
    notFound();
  }

  // 2. Récupérer ensuite tous les événements créés par cet utilisateur
  const events = await prisma.evenement.findMany({
    where: {
      createurId: company.user.id
    },
    orderBy: {
      date_debut: 'desc'
    }
  });

  const logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.user.name || 'E')}&background=E9D5FF&color=3730A3`;

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex items-center mb-8 border-b pb-6">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 shadow-md">
            <Image src={logoUrl} alt={`${company.user.name} logo`} fill className="object-cover" />
        </div>
        <div>
            <p className="text-sm text-gray-600">Événements organisés par</p>
            <h1 className="text-3xl font-bold text-gray-800">{company.user.name}</h1>
        </div>
      </div>

      {events.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <Card key={event.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{event.titre}</CardTitle>
                <p className="text-sm text-gray-500 pt-1">
                    Le {event.date_debut ? format(new Date(event.date_debut), "d MMMM yyyy", { locale: fr }) : 'Date à venir'}
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="line-clamp-4 text-gray-600 mb-4">{event.description}</p>
                <div className="text-sm text-gray-500 space-y-1">
                    <p className="flex items-center"><Calendar className="h-4 w-4 mr-2"/> Début : {event.date_debut ? format(new Date(event.date_debut), 'Pp', { locale: fr }) : 'N/A'}</p>
                    <p className="flex items-center"><MapPin className="h-4 w-4 mr-2"/> {event.lieu || 'Lieu non défini'}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-8 mt-8 bg-gray-50">
            <Calendar className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium">Aucun événement programmé</h3>
            <p className="mt-1 text-sm text-gray-500">
              {company.user.name} n'a aucun événement à venir pour le moment.
            </p>
        </Card>
      )}
       <div className="mt-12 text-center">
         <Link href={`/company/${params.id}`}>
             <Button variant="outline">
                 <ArrowLeft className="h-4 w-4 mr-2" />
                 Retour au profil de l'entreprise
             </Button>
         </Link>
       </div>
    </div>
  );
}