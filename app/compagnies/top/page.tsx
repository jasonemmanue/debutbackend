"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Star,
  TrendingUp,
  Award,
  Users,
  MapPin,
  Heart,
  MessageCircle,
  Filter,
  Crown,
  Medal,
  Trophy,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function TopCompaniesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const periods = [
    { id: "week", label: "Cette semaine" },
    { id: "month", label: "Ce mois" },
    { id: "quarter", label: "Ce trimestre" },
    { id: "year", label: "Cette année" },
  ]

  const categories = [
    { id: "all", label: "Toutes catégories" },
    { id: "technology", label: "Technologie" },
    { id: "finance", label: "Finance" },
    { id: "health", label: "Santé" },
    { id: "energy", label: "Énergie" },
  ]

  const topCompanies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      category: "Technologie",
      rating: 4.9,
      reviews: 247,
      employees: "100-500",
      location: "Paris, France",
      founded: 2015,
      logo: "/placeholder.svg?height=80&width=80",
      cover: "/placeholder.svg?height=200&width=400&text=TechCorp",
      description: "Leader en solutions technologiques innovantes et développement d'IA",
      services: ["Développement Web", "IA", "Cybersécurité"],
      clients: 150,
      projects: 300,
      growth: "+25%",
      verified: true,
      premium: true,
      rank: 1,
      previousRank: 1,
      trending: true,
    },
    {
      id: 2,
      name: "GreenEnergy France",
      category: "Énergie",
      rating: 4.8,
      reviews: 189,
      employees: "50-100",
      location: "Lyon, France",
      founded: 2018,
      logo: "/placeholder.svg?height=80&width=80",
      cover: "/placeholder.svg?height=200&width=400&text=GreenEnergy",
      description: "Spécialiste des énergies renouvelables et solutions durables",
      services: ["Énergie Solaire", "Éolien", "Consulting"],
      clients: 89,
      projects: 156,
      growth: "+18%",
      verified: true,
      premium: true,
      rank: 2,
      previousRank: 3,
      trending: true,
    },
    {
      id: 3,
      name: "FinanceMax Group",
      category: "Finance",
      rating: 4.7,
      reviews: 156,
      employees: "200-500",
      location: "Paris, France",
      founded: 2012,
      logo: "/placeholder.svg?height=80&width=80",
      cover: "/placeholder.svg?height=200&width=400&text=FinanceMax",
      description: "Solutions financières innovantes et services d'investissement",
      services: ["Investissement", "Conseil", "Fintech"],
      clients: 234,
      projects: 445,
      growth: "+12%",
      verified: true,
      premium: false,
      rank: 3,
      previousRank: 2,
      trending: false,
    },
    {
      id: 4,
      name: "HealthPlus Innovation",
      category: "Santé",
      rating: 4.6,
      reviews: 134,
      employees: "50-100",
      location: "Marseille, France",
      founded: 2019,
      logo: "/placeholder.svg?height=80&width=80",
      cover: "/placeholder.svg?height=200&width=400&text=HealthPlus",
      description: "Technologies médicales et solutions de télémédecine",
      services: ["Télémédecine", "Dispositifs", "Logiciels"],
      clients: 67,
      projects: 123,
      growth: "+22%",
      verified: true,
      premium: false,
      rank: 4,
      previousRank: 5,
      trending: true,
    },
    {
      id: 5,
      name: "EduSmart Technologies",
      category: "Éducation",
      rating: 4.5,
      reviews: 98,
      employees: "20-50",
      location: "Toulouse, France",
      founded: 2020,
      logo: "/placeholder.svg?height=80&width=80",
      cover: "/placeholder.svg?height=200&width=400&text=EduSmart",
      description: "Plateforme d'apprentissage en ligne avec IA adaptative",
      services: ["E-learning", "IA", "Formation"],
      clients: 45,
      projects: 78,
      growth: "+30%",
      verified: true,
      premium: false,
      rank: 5,
      previousRank: 7,
      trending: true,
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Trophy className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-2xl font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankChange = (rank: number, previousRank: number) => {
    if (rank < previousRank) {
      return { direction: "up", change: previousRank - rank, color: "text-green-600" }
    } else if (rank > previousRank) {
      return { direction: "down", change: rank - previousRank, color: "text-red-600" }
    }
    return { direction: "same", change: 0, color: "text-gray-500" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            🏆 Classement des meilleures entreprises
          </Badge>
          <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
            TOP
            <br />
            <span className="font-normal">ENTREPRISES</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto font-light opacity-90">
            Découvrez le classement des entreprises les mieux notées et les plus performantes de notre réseau
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 bg-white border-b border-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 font-medium">Période :</span>
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedPeriod === period.id
                        ? "bg-rose-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">Catégorie :</span>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <Badge className="bg-green-100 text-green-700">Mis à jour il y a 2h</Badge>
          </div>
        </div>
      </section>

      {/* Top 3 Podium */}
      <section className="py-16 px-6 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-gray-800">
              PODIUM <span className="font-normal text-rose-600">DU MOIS</span>
            </h2>
            <p className="text-lg text-gray-600">Les 3 entreprises les mieux classées ce mois-ci</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {topCompanies.slice(0, 3).map((company, index) => {
              const rankChange = getRankChange(company.rank, company.previousRank)
              return (
                <Card
                  key={company.id}
                  className={`group hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    company.rank === 1 ? "md:-mt-8 border-yellow-300 shadow-xl" : "border-rose-100"
                  } hover:border-rose-300`}
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={company.cover || "/placeholder.svg"}
                      alt={company.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      {getRankIcon(company.rank)}
                      {company.premium && <Badge className="bg-yellow-500 text-white">Premium</Badge>}
                    </div>
                    <div className="absolute top-4 right-4">
                      {rankChange.direction !== "same" && (
                        <Badge className={`${rankChange.color} bg-white/90`}>
                          {rankChange.direction === "up" ? "↗" : "↘"} {rankChange.change}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden">
                        <Image
                          src={company.logo || "/placeholder.svg"}
                          alt={company.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                          {company.name}
                        </h3>
                        <p className="text-sm text-gray-500">{company.category}</p>
                      </div>
                      {company.verified && <Badge className="bg-green-100 text-green-700">Vérifié</Badge>}
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="ml-1 font-semibold">{company.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({company.reviews})</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {company.growth}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{company.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {company.employees}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {company.location}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Building2 className="h-4 w-4 mr-1" />
                        {company.clients} clients
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Award className="h-4 w-4 mr-1" />
                        {company.projects} projets
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {company.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/company/${company.id}`}>
                      <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white">
                        Voir le profil
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Full Ranking */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-gray-800">
              CLASSEMENT <span className="font-normal text-rose-600">COMPLET</span>
            </h2>
            <p className="text-lg text-gray-600">Toutes les entreprises classées par performance</p>
          </div>

          <div className="space-y-6">
            {topCompanies.map((company) => {
              const rankChange = getRankChange(company.rank, company.previousRank)
              return (
                <Card
                  key={company.id}
                  className="group hover:shadow-xl transition-all duration-300 border-rose-100 hover:border-rose-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-rose-100 to-purple-100 rounded-2xl">
                          {getRankIcon(company.rank)}
                        </div>
                        {rankChange.direction !== "same" && (
                          <div className={`text-sm ${rankChange.color} font-medium`}>
                            {rankChange.direction === "up" ? "↗" : "↘"} {rankChange.change}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="w-12 h-12 rounded-xl overflow-hidden">
                            <Image
                              src={company.logo || "/placeholder.svg"}
                              alt={company.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                              {company.name}
                            </h3>
                            <p className="text-sm text-gray-500">{company.category}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {company.verified && <Badge className="bg-green-100 text-green-700">Vérifié</Badge>}
                            {company.premium && <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>}
                            {company.trending && (
                              <Badge className="bg-red-100 text-red-700">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Tendance
                              </Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-600 mb-3">{company.description}</p>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            {company.rating} ({company.reviews} avis)
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {company.employees}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {company.location}
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {company.growth}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Link href={`/company/${company.id}`}>
                          <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white">
                            Voir le profil
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8">
              Voir plus d'entreprises
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">
            VOTRE ENTREPRISE <span className="font-normal">MÉRITE D'ÊTRE ICI ?</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-light opacity-90">
            Inscrivez votre entreprise et grimpez dans le classement grâce aux avis de vos clients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 font-semibold text-lg px-8 py-6">
                Inscrire mon entreprise
              </Button>
            </Link>
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-700 font-semibold text-lg px-8 py-6"
            >
              Comment ça marche ?
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
