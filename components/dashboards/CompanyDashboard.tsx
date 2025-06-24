"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart2, 
  Bell, 
  FileText, 
  Briefcase, 
  PlusCircle, 
  ExternalLink,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  Star,
  ArrowRight,
  Settings,
  MessageSquare,
  Activity,
  ChevronRight,
  Building2,
  Handshake
} from "lucide-react";
import Link from 'next/link';
import { DashboardHero } from "../DashboardHero";
import type { Session } from "next-auth";
import { ChatbotTrigger } from '../ChatbotTrigger';

interface CompanyDashboardProps {
  user: Session["user"];
}

export function CompanyDashboard({ user }: CompanyDashboardProps) {
  // TODO: Remplacer cet ID par une récupération dynamique de l'ID de l'entreprise liée à l'utilisateur
  const companyId = "exemple-id"; 
  
  // Statistiques simulées
  const stats = [
    {
      title: "Vues du profil",
      value: "1,245",
      change: "+12%",
      icon: Eye,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Nouveaux suiveurs",
      value: "48",
      change: "+8%",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Candidatures reçues",
      value: "32",
      change: "+24%",
      icon: FileText,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Taux d'engagement",
      value: "6.8%",
      change: "+3%",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    }
  ];

  // Notifications récentes
  const notifications = [
    {
      type: "application",
      message: "3 nouvelles candidatures pour 'Développeur Full Stack'",
      time: "Il y a 2h",
      urgent: true
    },
    {
      type: "comment",
      message: "Nouveau commentaire sur votre annonce",
      time: "Il y a 4h",
      urgent: false
    },
    {
      type: "follower",
      message: "5 nouveaux followers cette semaine",
      time: "Il y a 1j",
      urgent: false
    }
  ];

  // Activités récentes
  const recentActivities = [
    {
      action: "Nouvelle annonce publiée",
      item: "Marketing Digital - Stage",
      time: "Il y a 3h"
    },
    {
      action: "Candidature acceptée",
      item: "Jean Dupont - Développeur",
      time: "Il y a 1j"
    },
    {
      action: "Événement créé",
      item: "Forum des Métiers Tech",
      time: "Il y a 2j"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      <ChatbotTrigger />
      <div className="container mx-auto px-6 py-8">
        {/* Message de bienvenue avec gradient */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light mb-2">
                Tableau de Bord de <span className="font-bold">{user?.name || 'Entreprise'}</span> 👋
              </h1>
              <p className="text-purple-100 text-lg mb-6">
                Votre centre de commande pour gérer votre présence et développer votre activité.
              </p>
              <div className="flex items-center space-x-4">
                <Button 
                  className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg"
                  asChild
                >
                  <Link href={`/company/${companyId}`}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir la page publique
                  </Link>
                </Button>
                <Button 
                  className="bg-white/20 text-white border-2 border-white/30 hover:bg-white hover:text-purple-600 backdrop-blur-sm shadow-lg transition-all duration-300"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Building2 className="w-16 h-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Statistiques */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BarChart2 className="w-6 h-6 mr-3 text-purple-600" />
                Statistiques
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${stat.color}`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {stat.change}
                        </Badge>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Actions principales */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-3 text-purple-600" />
                Gestion du contenu
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gérer les Annonces */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-amber-100 hover:scale-105">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-orange-700">
                      <FileText className="w-5 h-5 mr-2" />
                      Gérer les Annonces
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Créez ou modifiez vos annonces et actualités.
                    </p>
                    <Link href="/company/announcements" passHref>
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg">
                        Gérer mes annonces
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Gérer les Stages */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-100 hover:scale-105">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-green-700">
                      <Users className="w-5 h-5 mr-2" />
                      Gérer les Stages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Publiez des offres et consultez les candidatures.
                    </p>
                    <Link href="/company/internships" passHref>
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
                        Gérer mes stages
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
                
                {/* [AJOUTÉ] Gérer les Prestations */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-100 hover:scale-105">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-blue-700">
                      <Handshake className="w-5 h-5 mr-2" />
                      Gérer les Prestations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Proposez vos services et votre savoir-faire.
                    </p>
                    <Link href="/company/prestations/new" passHref>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
                        Créer une prestation
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Activités récentes */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-purple-600" />
                Activités récentes
              </h2>
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.item}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-purple-600" />
                Notifications
              </h2>
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {notifications.map((notification, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg ${notification.urgent ? 'bg-red-50 border border-red-200' : 'bg-blue-50'}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {notification.urgent && (
                            <Badge className="bg-red-500 text-white text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions rapides */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <PlusCircle className="w-5 h-5 mr-2 text-purple-600" />
                Actions rapides
              </h2>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg h-12"
                  asChild
                >
                  <Link href="/company/announcements/new">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Publier une annonce
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-purple-200 hover:bg-purple-50 h-12"
                  asChild
                >
                  <Link href="/company/announcements/events">
                    <Calendar className="w-4 h-4 mr-2" />
                    Gérer mes événements
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-blue-200 hover:bg-blue-50 h-12"
                  asChild
                >
                  <Link href="/company/messages">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Voir les messages
                  </Link>
                </Button>
              </div>
            </div>

            {/* Conseils */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-100">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-orange-700">
                  <Star className="w-5 h-5 mr-2" />
                  Conseil du jour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-3">
                  Optimisez votre profil entreprise en ajoutant des photos de vos locaux et de votre équipe pour attirer plus de candidats.
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  En savoir plus
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <DashboardHero 
        title="RETROUVEZ LES ENTREPRISES EXPERTES DANS LEURS DOMAINES"
        subtitle="Connectez-vous avec les meilleures entreprises de votre secteur et développez votre réseau professionnel avec excellence."
        showSearchBar={false}
      />
    </div>
  );
}