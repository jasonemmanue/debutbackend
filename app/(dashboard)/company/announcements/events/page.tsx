// /app/(dashboard)/company/announcements/events/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function CompanyEventsPage() {
    const session = await auth();
    if (!session?.user) {
        redirect('/auth/login');
    }

    const events = await prisma.evenement.findMany({
        where: { createurId: session.user.id },
        orderBy: { date_debut: 'desc' }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Mes Événements</h1>
                    <p className="text-gray-600">Gérez tous les événements de votre entreprise.</p>
                </div>
                <Link href="/company/announcements/events/new">
                    <Button className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Créer un événement
                    </Button>
                </Link>
            </div>
            <div className="space-y-6">
                {events.length > 0 ? (
                    events.map(event => (
                        <Card key={event.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader><CardTitle>{event.titre}</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">{event.description}</p>
                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>Début : {event.date_debut ? format(new Date(event.date_debut), "d MMMM yyyy 'à' HH:mm", { locale: fr }) : 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>Fin : {event.date_fin ? format(new Date(event.date_fin), "d MMMM yyyy 'à' HH:mm", { locale: fr }) : 'N/A'}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card><CardContent className="p-8 text-center text-gray-500"><p>Vous n'avez encore créé aucun événement.</p></CardContent></Card>
                )}
            </div>
        </div>
    );
}