"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, PlusCircle, Edit, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyDashboardPage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="container mx-auto py-12 px-6">
                <Skeleton className="h-10 w-1/3 mb-8" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        );
    }
    
    if (status !== "authenticated" || !session.user) {
        return <p>Accès non autorisé.</p>;
    }
    
    const companyId = "exemple-id"; // TODO: Remplacez par l'ID réel de l'entreprise depuis la base de données

    return (
        <div className="container mx-auto py-12 px-6 bg-gray-50 min-h-screen">
            <header className="mb-12">
                <h1 className="text-4xl font-bold text-gray-800">Dashboard de {session.user.name}</h1>
                <p className="text-lg text-gray-600">Gérez toutes les activités de votre entreprise ici.</p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Carte de gestion de profil */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Building2 className="text-rose-500" />
                            <span>Profil de l'Entreprise</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600">Mettez à jour les informations publiques de votre entreprise.</p>
                        <div className="flex space-x-2">
                             <Button variant="outline"><Edit className="mr-2 h-4 w-4"/> Modifier le profil</Button>
                             <Link href={`/company/${companyId}`} passHref>
                                <Button variant="ghost" className="text-rose-600"><ExternalLink className="mr-2 h-4 w-4"/> Voir la page publique</Button>
                             </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Carte de gestion des annonces */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                           <span>Gérer les Annonces</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600">Publiez et gérez vos annonces de recrutement, d'information ou de promotion.</p>
                        <Button className="w-full"><PlusCircle className="mr-2 h-4 w-4"/> Créer une nouvelle annonce</Button>
                    </CardContent>
                </Card>

                {/* Carte de gestion des stages */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                           <span>Gérer les Stages</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600">Proposez des offres de stage et consultez les candidatures reçues.</p>
                        <Button className="w-full"><PlusCircle className="mr-2 h-4 w-4"/> Proposer un nouveau stage</Button>
                    </CardContent>
                </Card>
                
                 {/* Ajoutez d'autres cartes pour les événements, prestations, etc. */}

            </div>
        </div>
    );
}