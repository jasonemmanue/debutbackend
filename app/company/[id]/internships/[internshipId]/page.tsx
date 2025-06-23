// /app/company/[id]/internships/[internshipId]/page.tsx
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Calendar, FileText, GraduationCap, DollarSign } from "lucide-react";
import Link from "next/link";
import ApplyButton from "./ApplyButton"; // Importer le composant client pour le bouton "Postuler"

export default async function InternshipDetailPage({ params }: { params: { id: string, internshipId: string }}) {
    const offer = await prisma.stage.findUnique({
        where: { id: params.internshipId, entrepriseId: params.id },
        include: { entreprise: { include: { user: true } } }
    });

    if (!offer || !offer.entreprise.user) {
        notFound();
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-gray-900">{offer.titre}</CardTitle>
                            <Link href={`/company/${offer.entrepriseId}`} className="text-lg text-gray-600 hover:text-rose-600 transition-colors pt-1 inline-flex items-center">
                                <Building2 className="mr-2 h-5 w-5"/>
                                {offer.entreprise.user.name}
                            </Link>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="prose max-w-none text-gray-700">
                                <h3 className="font-semibold text-xl">Description du stage</h3>
                                <p>{offer.description || 'Aucune description fournie.'}</p>
                                
                                <h3 className="font-semibold text-xl mt-6">Détails de l'offre</h3>
                                <div className="grid md:grid-cols-2 gap-4 mt-4">
                                    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md">
                                        <Calendar className="text-gray-500 h-5 w-5"/>
                                        <span><strong>Durée :</strong> {offer.duree_stage || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md">
                                        <GraduationCap className="text-gray-500 h-5 w-5"/>
                                        <span><strong>Niveau requis :</strong> {offer.niveau_etude_requis || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md">
                                        <FileText className="text-gray-500 h-5 w-5"/>
                                        <span><strong>Compétences :</strong> {offer.competences_requises || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md">
                                        <DollarSign className="text-gray-500 h-5 w-5"/>
                                        <span><strong>Rémunération :</strong> {offer.remunere ? 'Oui' : 'Non'}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-8 shadow-lg">
                       <CardHeader>
                          <CardTitle>Prêt(e) à candidater ?</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <ApplyButton stageId={offer.id} companyId={offer.entrepriseId} />
                       </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}