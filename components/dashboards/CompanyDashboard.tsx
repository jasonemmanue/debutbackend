"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, Bell, FileText, Briefcase, PlusCircle, ExternalLink } from "lucide-react";
import Link from 'next/link';
import { DashboardHero } from "../DashboardHero";
import type { Session } from "next-auth";

interface CompanyDashboardProps {
  user: Session["user"];
}

export function CompanyDashboard({ user }: CompanyDashboardProps) {
    const companyId = "exemple-id"; // TODO: À remplacer par le vrai ID de l'entreprise
  return (
    <div className="bg-slate-50 min-h-screen">
       <div className="container mx-auto py-12 px-6">
        <header className="mb-12 flex justify-between items-center">
          <div>
              <h1 className="text-4xl font-bold text-gray-800">Tableau de Bord de {user?.name || 'Entreprise'}</h1>
              <p className="text-lg text-gray-600">Votre centre de commande pour gérer votre présence.</p>
          </div>
          <Link href={`/company/${companyId}`} passHref>
              <Button variant="outline"><ExternalLink className="mr-2 h-4 w-4"/> Voir la page publique</Button>
          </Link>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           <Card className="hover:shadow-lg transition-shadow">
            <CardHeader><CardTitle className="flex items-center gap-3"><BarChart2 className="text-rose-500" />Statistiques</CardTitle></CardHeader>
            <CardContent><p>Vues du profil, nouveaux suiveurs, et performance des annonces.</p></CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader><CardTitle className="flex items-center gap-3"><Bell className="text-purple-500" />Notifications</CardTitle></CardHeader>
            <CardContent><p>Nouvelles candidatures, commentaires et messages.</p></CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader><CardTitle className="flex items-center gap-3"><FileText className="text-rose-500" />Gérer les Annonces</CardTitle></CardHeader>
            <CardContent>
              <p className="mb-4">Créez ou modifiez vos annonces.</p>
              <Button className="w-full"><PlusCircle className="mr-2 h-4 w-4"/> Gérer mes annonces</Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader><CardTitle className="flex items-center gap-3"><Briefcase className="text-purple-500" />Gérer les Stages</CardTitle></CardHeader>
            <CardContent>
              <p className="mb-4">Publiez des offres et consultez les candidatures.</p>
              <Button className="w-full"><PlusCircle className="mr-2 h-4 w-4"/> Gérer mes stages</Button>
            </CardContent>
          </Card>
        </div>
      </div>

       {/* Section Hero pour l'entreprise */}
       <DashboardHero 
        title={<>RETROUVEZ LES ENTREPRISES<br/><span className="font-normal bg-gradient-to-r from-rose-200 to-purple-200 bg-clip-text text-transparent">EXPERTES DANS LEURS DOMAINES</span></>}
        subtitle="Connectez-vous avec les meilleures entreprises de votre secteur et développez votre réseau professionnel avec excellence."
        showSearchBar={false}
      />
    </div>
  );
}