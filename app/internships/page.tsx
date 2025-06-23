// /app/internships/page.tsx
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AllInternshipsPage() {
    const offers = await prisma.stage.findMany({
        include: {
            entreprise: {
                include: {
                    user: { select: { name: true } }
                }
            }
        },
        orderBy: { date_debut: 'desc' }
    });

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8">Toutes les offres de stage</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map(offer => (
                    <Card key={offer.id}>
                        <CardHeader>
                            <CardTitle>{offer.titre}</CardTitle>
                            <div className="flex items-center text-sm text-gray-500 pt-2">
                                <Building2 className="h-4 w-4 mr-2" />
                                {offer.entreprise.user.name}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="line-clamp-3 text-gray-600 mb-4">{offer.description}</p>
                            <Link href={`/company/${offer.entrepriseId}/internships/${offer.id}`}>
                                <Button className="w-full">
                                    Voir l'offre <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}