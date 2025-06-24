// /app/(dashboard)/client/events/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import React from 'react';
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, MapPin, Clock, Building2 } from "lucide-react";

// Le composant pour le badge de statut (Inscrit, etc.) reste inchangé
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'inscrit':
      return <Badge className="bg-green-100 text-green-700">Inscrit(e)</Badge>;
    case 'present':
      return <Badge className="bg-blue-100 text-blue-700">Présent(e)</Badge>;
    case 'absent':
      return <Badge variant="destructive">Absent(e)</Badge>;
    default:
      return <Badge variant="secondary">Statut inconnu</Badge>;
  }
};

// Composant réutilisable pour afficher une carte d'événement, maintenant simplifié
const EventCard = ({ event, isCurrent = false }: { event: any, isCurrent?: boolean }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* Le div principal n'a plus besoin de "flex justify-between" */}
        <div> 
          <h3 className="font-bold text-lg">{event.titre}</h3>
          <div className="flex items-center mt-2 space-x-2 flex-wrap gap-y-1">
            <Link href={event.createur?.entreprise ? `/company/${event.createur.entreprise.id}` : '#'}>
                <Badge variant="outline" className="hover:bg-gray-100 cursor-pointer">
                    <Building2 className="h-3 w-3 mr-1.5"/>
                    par: {event.createur.name}
                </Badge>
            </Link>
            {isCurrent && <Badge className="bg-lime-100 text-lime-800"><Clock className="h-3 w-3 mr-1"/>En cours</Badge>}
          </div>
          <div className="mt-3 text-sm text-gray-600 space-y-1">
            <p className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5" />
              Du {event.date_debut ? format(new Date(event.date_debut), 'd MMM, HH:mm', { locale: fr }) : 'N/A'}
              {' au '}
              {event.date_fin ? format(new Date(event.date_fin), 'd MMM, HH:mm', { locale: fr }) : 'N/A'}
            </p>
            <p className="flex items-center"><MapPin className="h-4 w-4 mr-1.5" />{event.lieu || 'Lieu à confirmer'}</p>
          </div>
        </div>
        {/* Le bouton "S'inscrire" a été retiré d'ici */}
      </CardContent>
    </Card>
);

// [REMARQUE] Le nom de la fonction a été changé pour éviter toute confusion avec la page publique /events
export default async function ClientDashboardEventsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');

  const allEvents = await prisma.evenement.findMany({
    include: {
      createur: { 
        select: { 
          name: true,
          entreprise: { select: { id: true } } 
        } 
      }
    },
    orderBy: { date_debut: 'asc' }
  });

  const now = new Date();
  
  const upcomingEvents: typeof allEvents = [];
  const pastEvents: typeof allEvents = [];
  const currentEvents: typeof allEvents = [];

  for (const event of allEvents) {
    const startDate = event.date_debut ? new Date(event.date_debut) : null;
    const endDate = event.date_fin ? new Date(event.date_fin) : null;

    if (!startDate || !endDate) continue;

    if (startDate > now) {
      upcomingEvents.push(event);
    } else if (endDate < now) {
      pastEvents.push(event);
    } else {
      currentEvents.push(event);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Événements du Réseau</h1>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-700">En ce moment</h2>
          {currentEvents.length > 0 ? (
            <div className="space-y-4">{currentEvents.map(event => <EventCard key={event.id} event={event} isCurrent={true} />)}</div>
          ) : (
            <Card><CardContent className="p-8 text-center"><p className="text-gray-500">Aucun événement en cours pour le moment.</p></CardContent></Card>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Prochainement</h2>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">{upcomingEvents.map(event => <EventCard key={event.id} event={event} />)}</div>
          ) : (
            <Card><CardContent className="p-8 text-center"><p className="text-gray-500">Aucun événement à venir.</p></CardContent></Card>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Événements passés</h2>
          {pastEvents.length > 0 ? (
            <div className="space-y-4 opacity-70">{pastEvents.map(event => <EventCard key={event.id} event={event} />)}</div>
          ) : (
            <Card><CardContent className="p-8 text-center"><p className="text-gray-500">Aucun événement passé.</p></CardContent></Card>
          )}
        </div>
      </div>
    </div>
  );
}