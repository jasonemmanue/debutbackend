// app/(dashboard)/client/applications/page.tsx

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search, Briefcase, FileText, CheckCircle2, XCircle, Clock4, 
  ChevronRightCircle, Filter, ChevronLeft
} from "lucide-react";

// Le composant est maintenant un Composant Serveur qui fait l'appel à la base de données
export default async function MyApplicationsPage() {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    redirect('/auth/login');
  }

  // Récupération des données personalisées pour l'utilisateur connecté
  const userApplicationsData = await prisma.demandeStage.findMany({
    where: {
      stagiaire: {
        userId: session.user.id
      }
    },
    include: {
      stage: {
        include: {
          entreprise: {
            select: {
              raison_sociale: true,
              adresse: true,
            }
          }
        }
      }
    },
    orderBy: {
      date_demande: 'desc'
    }
  });
  
  // Formatage des données pour correspondre à la structure attendue
  const applications = userApplicationsData.map(app => ({
    id_stage: app.stage.id,
    titre_stage: app.stage.titre,
    duree_stage: "6 mois", // Remplacez par le vrai champ si disponible
    remunere: true, // Remplacez par le vrai champ si disponible
    date_debut_prevue: app.stage.date_debut?.toISOString(),
    entreprise: app.stage.entreprise.raison_sociale || "N/A",
    location: app.stage.entreprise.adresse || "N/A",
    status: app.statut.replace('_', ''), // ex: 'en_attente' -> 'enattente'
    date_postulation: app.date_demande.toISOString()
  }));

  const pendingApplications = applications.filter(app => app.status === "enattente");
  const acceptedApplications = applications.filter(app => app.status === "accepte");
  const rejectedApplications = applications.filter(app => app.status === "refuse");

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-6 sm:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Mes Candidatures</h1>
            <p className="text-gray-600">Suivez l'état de toutes vos postulations de stage.</p>
        </div>
        <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
            <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 mr-4">
                    <Clock4 className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{pendingApplications.length}</h3>
                    <p className="text-sm text-gray-500">En attente</p>
                </div>
            </CardContent>
        </Card>
        {/* ... Autres cartes de statistiques */}
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune candidature trouvée</h3>
            <p className="mt-2 text-gray-500">Vous n'avez postulé à aucun stage pour le moment.</p>
            <Button className="mt-4">
              <Briefcase className="h-4 w-4 mr-2" />
              Voir les offres de stage
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
            {/* Section En attente */}
            {pendingApplications.length > 0 && (
                 <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock4 className="h-5 w-5 mr-2 text-amber-500" />
                        Candidatures en attente
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {pendingApplications.map((app) => (
                          <Card key={app.id_stage}>
                            <CardContent className="p-6">
                               <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-bold text-lg">{app.titre_stage}</h3>
                                  <p className="text-gray-600">{app.entreprise} • {app.location}</p>
                                  <div className="flex items-center mt-2 space-x-2">
                                    <Badge variant="outline">{app.duree_stage}</Badge>
                                    <Badge variant="outline">{app.remunere ? "Rémunéré" : "Non rémunéré"}</Badge>
                                  </div>
                               </div>
                               <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">Voir l'offre</Button>
                                  <Button variant="destructive" size="sm">Annuler</Button>
                                </div>
                              </div>
                              <div className="mt-4 pt-4 border-t">
                                <p className="text-sm text-gray-500">
                                  <span className="font-medium">Postulé le:</span> {new Date(app.date_postulation).toLocaleDateString()}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </CardContent>
                </Card>
            )}
            {/* ... Autres sections pour acceptées et refusées ... */}
        </div>
      )}
    </div>
  );
}