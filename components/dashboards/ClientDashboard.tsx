"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rss, Star, Briefcase, Calendar, Building2 } from "lucide-react";
import Link from 'next/link';
import { DashboardHero } from '../DashboardHero';
import type { Session } from "next-auth";

// Typage des props pour plus de clarté
interface ClientDashboardProps {
  user: Session["user"];
}

export function ClientDashboard({ user }: ClientDashboardProps) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto py-12 px-6">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Bienvenue, {user?.name || 'Client'} !</h1>
          <p className="text-lg text-gray-600">Votre espace personnel pour interagir avec notre réseau.</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader><CardTitle className="flex items-center gap-3"><Rss className="text-rose-500" />Fil d'actualités</CardTitle></CardHeader>
            <CardContent><p>Découvrez les dernières nouvelles des entreprises que vous suivez.</p></CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader><CardTitle className="flex items-center gap-3"><Building2 className="text-purple-500" />Mes Entreprises Suivies</CardTitle></CardHeader>
            <CardContent>
              <p>Accédez rapidement aux profils des entreprises qui vous intéressent.</p>
              <Link href="/dashboard/client/followed" passHref>
                  <Button className="mt-4 w-full">Voir mes entreprises</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader><CardTitle className="flex items-center gap-3"><Briefcase className="text-rose-500" />Mes Candidatures</CardTitle></CardHeader>
            <CardContent><p>Suivez l'avancement de vos demandes de stage.</p></CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader><CardTitle className="flex items-center gap-3"><Calendar className="text-purple-500" />Mes Événements</CardTitle></CardHeader>
            <CardContent><p>Consultez les événements auxquels vous êtes inscrit.</p></CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader><CardTitle className="flex items-center gap-3"><Star className="text-rose-500" />Suggestions</CardTitle></CardHeader>
            <CardContent><p>Découvrez de nouvelles entreprises prometteuses.</p></CardContent>
          </Card>
        </div>
      </div>
      
      {/* Section Hero pour le client */}
      <DashboardHero 
        title={<>Trouvez Votre<br/><span className="font-normal text-rose-200">Prochain Partenaire</span></>}
        subtitle="Utilisez notre moteur de recherche pour découvrir les meilleures entreprises de votre secteur."
        showSearchBar={true}
      />
    </div>
  );
}