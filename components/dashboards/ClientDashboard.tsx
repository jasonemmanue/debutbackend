"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rss, Star, Briefcase, Calendar, Building2, TrendingUp, Plus, ArrowRight, Eye, Users, Bell, MessageSquare, Settings, User } from "lucide-react";
import Link from 'next/link';
import { DashboardHero } from '../DashboardHero';
import type { Session } from "next-auth";

// Typage des props pour plus de clarté
interface ClientDashboardProps {
  user: Session["user"];
}

export function ClientDashboard({ user }: ClientDashboardProps) {
  // Données simulées pour l'utilisateur
  const userProfile = {
    name: user?.name || "Client",
    type: "Particulier",
    avatar: user?.image || "https://placehold.co/80x80/E0E7FF/3730A3?text=" + (user?.name?.charAt(0) || "C"),
    interests: ["Technologie", "Marketing", "Développement"],
    joinDate: "Janvier 2024"
  };

  // Statistiques utilisateur
  const userStats = [
    {
      title: "Entreprises suivies",
      value: "8",
      icon: Building2,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Candidatures",
      value: "3",
      icon: Briefcase,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Événements",
      value: "5",
      icon: Calendar,
      color: "from-green-500 to-teal-500"
    }
  ];

  // Activités récentes
  const recentActivities = [
    {
      id: 1,
      title: "TechCorp Solutions a publié une nouvelle offre",
      time: "Il y a 2h",
      type: "offer"
    },
    {
      id: 2,
      title: "Nouveau message de GreenEnergy France",
      time: "Il y a 4h",
      type: "message"
    },
    {
      id: 3,
      title: "Forum des Métiers Tech - Rappel d'événement",
      time: "Il y a 1 jour",
      type: "event"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Header moderne */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-purple-500 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Dashboard Client</h1>
                <p className="text-sm text-gray-500">Gérez vos interactions professionnelles</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar avec profil utilisateur */}
          <div className="col-span-3">
            <Card className="border-rose-100 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-rose-100"
                  />
                  <h3 className="font-semibold text-gray-800">{userProfile.name}</h3>
                  <Badge className="mt-2 bg-blue-100 text-blue-700">
                    {userProfile.type}
                  </Badge>
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-500">Centres d'intérêt</h4>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {userProfile.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-3">Membre depuis {userProfile.joinDate}</p>
                </div>

                {/* Statistiques rapides */}
                <div className="space-y-3">
                  {userStats.map((stat, index) => (
                    <div key={index} className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r ${stat.color} mr-3`}>
                        <stat.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="col-span-9">
            {/* Message de bienvenue moderne */}
            <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-8 text-white mb-8">
              <h2 className="text-3xl font-light mb-2">
                Bienvenue, <span className="font-semibold">{userProfile.name}</span> ! 👋
              </h2>
              <p className="text-rose-100 mb-4">
                Votre espace personnel pour interagir avec notre réseau d'entreprises partenaires
              </p>
              <Button className="bg-white text-rose-600 hover:bg-rose-50">
                <Plus className="h-4 w-4 mr-2" />
                Compléter mon profil
              </Button>
            </div>

            {/* Grille de cartes principales */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-rose-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Rss className="text-white h-5 w-5" />
                    </div>
                    <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                      Fil d'actualités
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Découvrez les dernières nouvelles des entreprises que vous suivez.</p>
                  <Link href="/client/feed" passHref>
                    <Button variant="outline" className="w-full border-rose-200 text-rose-600 hover:bg-rose-50">
                      Voir les actualités
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-purple-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Building2 className="text-white h-5 w-5" />
                    </div>
                    <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                      Mes Entreprises Suivies
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Accédez rapidement aux profils des entreprises qui vous intéressent.</p>
                  <Link href="/client/followed-companies" passHref>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
                      Voir mes entreprises
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-cyan-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Briefcase className="text-white h-5 w-5" />
                    </div>
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                      Mes Candidatures
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Suivez l'avancement de vos demandes de stage.</p>
                  <Link href="/client/applications" passHref>
                    <Button variant="outline" className="w-full border-cyan-200 text-cyan-600 hover:bg-cyan-50">
                      Gérer mes candidatures
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-green-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <Calendar className="text-white h-5 w-5" />
                    </div>
                    <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                      Mes Événements
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Consultez les événements auxquels vous êtes inscrit.</p>
                  <Link href="/client/events" passHref>
                    <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
                      Voir mes événements
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-yellow-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Star className="text-white h-5 w-5" />
                    </div>
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                      Suggestions
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Découvrez de nouvelles entreprises prometteuses.</p>
                  <Link href="/client/suggestions" passHref>
                    <Button variant="outline" className="w-full border-yellow-200 text-yellow-600 hover:bg-yellow-50">
                      Explorer les suggestions
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Section Activités récentes */}
            <Card className="border-rose-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <span>Activités récentes</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-rose-600">
                    Voir tout
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                      <div className="p-2 bg-blue-50 rounded-lg mr-4">
                        <Eye className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        Voir
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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