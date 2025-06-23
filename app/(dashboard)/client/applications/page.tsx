// /app/(dashboard)/client/applications/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle2, XCircle, Clock4, Briefcase } from "lucide-react";

// Fonction pour générer un badge de statut visuellement distinct
const getStatusBadge = (status: 'en_attente' | 'accepte' | 'refuse') => {
  switch (status) {
    case 'accepte':
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          <CheckCircle2 className="mr-1 h-3 w-3"/>
          Acceptée
        </Badge>
      );
    case 'refuse':
      return (
        <Badge variant="destructive">
          <XCircle className="mr-1 h-3 w-3"/>
          Refusée
        </Badge>
      );
    default: // 'en_attente'
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <Clock4 className="mr-1 h-3 w-3"/>
          En attente
        </Badge>
      );
  }
};

export default async function MyApplicationsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  // Vérifier si l'utilisateur a un profil de stagiaire, car seul un stagiaire peut postuler.
  const stagiaireProfile = await prisma.stagiaire.findUnique({
    where: { userId: session.user.id },
  });

  // S'il n'a pas de profil stagiaire, on l'invite à compléter son profil.
  if (!stagiaireProfile) {
    return (
      <div className="container mx-auto py-12 text-center">
        <Card className="max-w-md mx-auto p-8">
            <Briefcase className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium">Profil incomplet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Vous devez avoir un profil de stagiaire pour pouvoir postuler et voir vos candidatures.
            </p>
            <Link href="/client/profile">
                <Button className="mt-4">Compléter mon profil</Button>
            </Link>
        </Card>
      </div>
    );
  }

  // Récupérer toutes les candidatures de ce stagiaire
  const applications = await prisma.demandeStage.findMany({
    where: { stagiaireId: stagiaireProfile.id },
    include: {
      stage: {
        include: { 
          entreprise: { 
            include: { 
              user: { select: { name: true } } 
            } 
          } 
        }
      }
    },
    orderBy: { date_demande: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-6 sm:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mes Candidatures</h1>

        {applications.length === 0 ? (
          <Card className="text-center p-8">
              <FileText className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium">Aucune candidature pour le moment</h3>
              <p className="mt-1 text-sm text-gray-500">Vous n'avez encore postulé à aucune offre de stage.</p>
              <Link href="/internships">
                <Button className="mt-4">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Voir les offres de stage
                </Button>
              </Link>
          </Card>
        ) : (
          <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{app.stage.titre}</h3>
                      <p className="text-gray-600">{app.stage.entreprise.user.name}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Postulé le: {new Date(app.date_demande).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    {getStatusBadge(app.statut)}
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}