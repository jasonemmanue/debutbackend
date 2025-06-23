// /app/(dashboard)/company/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, PlusCircle, Edit, ExternalLink, Mail, Phone, MapPin, Hash } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function CompanyDashboardPage() {
    const session = await auth();

    // Rediriger si l'utilisateur n'est pas connecté ou n'est pas une entreprise/employé
    if (!session?.user || (session.user.type !== 'entreprise' && session.user.type !== 'employe')) {
        redirect('/auth/login');
    }

    // Récupérer les informations complètes de l'entreprise depuis la base de données
    const companyProfile = await prisma.entreprise.findUnique({
        where: { userId: session.user.id },
    });

    if (!companyProfile) {
        // Rediriger pour compléter le profil si la fiche entreprise n'existe pas
        redirect('/auth/complete-profile');
    }

    return (
        <div className="container mx-auto py-12 px-6 bg-gray-50 min-h-screen">
            <header className="mb-12">
                {/* MODIFICATION : Utilisation directe du nom de la session, qui est maintenant correct */}
                <h1 className="text-4xl font-bold text-gray-800">Dashboard de {session.user.name}</h1>
                <p className="text-lg text-gray-600">Gérez toutes les activités de votre entreprise ici.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Carte du Profil */}
                <Card className="md:col-span-1 hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Building2 className="text-rose-500" />
                            <span>Votre Profil</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <p className="flex items-start gap-2"><Hash className="h-4 w-4 mt-1 text-gray-400" /> <strong>SIRET :</strong> {companyProfile.siret}</p>
                        <p className="flex items-start gap-2"><Mail className="h-4 w-4 mt-1 text-gray-400" /> <strong>Email :</strong> {session.user.email}</p>
                        {companyProfile.telephone && <p className="flex items-start gap-2"><Phone className="h-4 w-4 mt-1 text-gray-400" /> <strong>Téléphone :</strong> {companyProfile.telephone}</p>}
                        {companyProfile.secteur_activite && <p className="flex items-start gap-2"><Building2 className="h-4 w-4 mt-1 text-gray-400" /> <strong>Secteur :</strong> {companyProfile.secteur_activite}</p>}
                        {companyProfile.adresse && <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1 text-gray-400" /> <strong>Adresse :</strong> {companyProfile.adresse}</p>}

                         <div className="flex flex-col space-y-2 pt-4">
                             <Button variant="outline"><Edit className="mr-2 h-4 w-4"/> Modifier le profil</Button>
                             <Link href={`/company/${companyProfile.id}`} passHref>
                                <Button variant="ghost" className="text-rose-600 w-full"><ExternalLink className="mr-2 h-4 w-4"/> Voir la page publique</Button>
                             </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Cartes d'actions */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader><CardTitle>Gérer les Annonces</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-600">Publiez et gérez vos annonces.</p>
                            <Button className="w-full"><PlusCircle className="mr-2 h-4 w-4"/> Gérer les annonces</Button>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader><CardTitle>Gérer les Stages</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-600">Proposez des offres et consultez les candidatures.</p>
                            <Button className="w-full"><PlusCircle className="mr-2 h-4 w-4"/> Gérer les stages</Button>
                        </CardContent>
                    </Card>
                    {/* Ajoutez d'autres cartes ici */}
                </div>
            </div>
        </div>
    );
}