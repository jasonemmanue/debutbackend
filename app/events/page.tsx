// /app/events/page.tsx
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2, MapPin } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AllEventsPage() {
    const allEvents = await prisma.evenement.findMany({
        include: {
            createur: {
                select: { name: true, entreprise: { select: { id: true } } }
            }
        },
        orderBy: { date_debut: 'asc' },
        where: { date_debut: { gte: new Date() } }, // On affiche que les événements à venir
        take: 50
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                     <h1 className="text-5xl font-bold mb-4">Calendrier des Événements</h1>
                     <p className="text-lg text-gray-600">Découvrez les prochains événements de notre réseau.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allEvents.map(event => (
                        <Card key={event.id} className="flex flex-col hover:shadow-xl transition-all">
                            <CardHeader>
                                <Link href={event.createur?.entreprise ? `/company/${event.createur.entreprise.id}` : '#'}>
                                    <Badge className="w-fit mb-2 hover:bg-gray-200 cursor-pointer">
                                        <Building2 className="h-3 w-3 mr-1.5" />
                                        {event.createur?.name || 'Anonyme'}
                                    </Badge>
                                </Link>
                                <CardTitle className="text-xl">{event.titre}</CardTitle>
                                <p className="text-xs text-gray-500">
                                    {event.date_debut ? format(new Date(event.date_debut), 'd MMMM yyyy', { locale: fr }) : 'Date à venir'}
                                </p>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-gray-700 line-clamp-4">{event.description}</p>
                            </CardContent>
                            <div className="p-6 pt-0 text-sm text-gray-600">
                                <p className="flex items-center"><Calendar className="h-4 w-4 mr-2"/> Début : {event.date_debut ? format(new Date(event.date_debut), 'Pp', { locale: fr }) : 'N/A'}</p>
                                <p className="flex items-center mt-1"><MapPin className="h-4 w-4 mr-2"/> {event.lieu || 'Lieu à confirmer'}</p>
                            </div>
                        </Card>
                    ))}
                    {allEvents.length === 0 && (
                        <p className="col-span-full text-center text-gray-500">Aucun événement à venir pour le moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
}