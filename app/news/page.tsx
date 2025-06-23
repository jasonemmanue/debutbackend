// app/news/page.tsx
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// On rend la page dynamique car les news changent souvent
export const dynamic = 'force-dynamic';

export default async function AllNewsPage() {
    const allAnnouncements = await prisma.annonce.findMany({
        include: {
            // CORRECTION : On inclut le créateur de l'annonce,
            // puis l'entreprise liée à ce créateur.
            createur: {
                include: {
                    entreprise: {
                        select: {
                            id: true, // On récupère l'ID pour le lien
                        }
                    }
                }
            }
        },
        orderBy: { date_publication: 'desc' },
        take: 50 // Limiter le nombre d'annonces affichées
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                     <h1 className="text-5xl font-bold mb-4">Actualités de notre réseau</h1>
                     <p className="text-lg text-gray-600">Restez informé des dernières nouvelles de nos entreprises partenaires.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allAnnouncements.map(news => (
                        <Card key={news.id} className="flex flex-col">
                            <CardHeader>
                                {/* CORRECTION : On affiche le nom du créateur (qui est le nom de l'entreprise) */}
                                <Badge className="w-fit mb-2">{news.createur?.name || 'Annonceur'}</Badge>
                                <CardTitle className="text-xl">{news.titre}</CardTitle>
                                <p className="text-xs text-gray-500">
                                    {news.date_publication ? format(new Date(news.date_publication), 'd MMMM yyyy', { locale: fr }) : 'Date inconnue'}
                                </p>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-gray-700 line-clamp-4">
                                    {news.contenu}
                                </p>
                            </CardContent>
                            <div className="p-6 pt-0">
                                {/* CORRECTION : Le lien pointe maintenant vers l'ID de l'entreprise via le créateur */}
                                <Link href={news.createur?.entreprise ? `/company/${news.createur.entreprise.id}` : '#'}>
                                    <Button variant="outline" className="w-full">
                                      Voir l'entreprise
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}