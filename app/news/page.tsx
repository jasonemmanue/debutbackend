"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Eye,
  Clock,
  Building2,
  ArrowRight,
  TrendingUp,
  Star,
  ChevronDown,
  Bookmark,
  Share2,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", label: "Toutes", count: 24 },
    { id: "tech", label: "Technologie", count: 8 },
    { id: "finance", label: "Finance", count: 6 },
    { id: "health", label: "Santé", count: 4 },
    { id: "energy", label: "Énergie", count: 3 },
    { id: "education", label: "Éducation", count: 3 },
  ]

  const featuredNews = [
    {
      id: 1,
      title: "L'IA révolutionne le secteur financier français",
      excerpt:
        "Les banques françaises investissent massivement dans l'intelligence artificielle pour améliorer l'expérience client et optimiser leurs processus internes.",
      company: "FinanceMax Group",
      category: "finance",
      image: "/placeholder.svg?height=400&width=600&text=IA+Finance",
      author: "Marie Dubois",
      date: "Il y a 2 heures",
      readTime: "5 min",
      views: "2.1k",
      likes: 45,
      comments: 12,
      trending: true,
    },
    {
      id: 2,
      title: "TechCorp lance sa plateforme de développement no-code",
      excerpt:
        "Une nouvelle solution permettant aux entreprises de créer des applications sans programmation, révolutionnant l'approche du développement logiciel.",
      company: "TechCorp Solutions",
      category: "tech",
      image: "/placeholder.svg?height=400&width=600&text=No-Code+Platform",
      author: "Pierre Martin",
      date: "Il y a 4 heures",
      readTime: "7 min",
      views: "1.8k",
      likes: 38,
      comments: 9,
      trending: true,
    },
  ]

  const regularNews = [
    {
      id: 3,
      title: "GreenEnergy signe un partenariat majeur avec l'État",
      excerpt: "Accord pour l'installation de 1000 MW d'énergie solaire sur le territoire national d'ici 2025.",
      company: "GreenEnergy France",
      category: "energy",
      image: "/placeholder.svg?height=300&width=400&text=Solar+Energy",
      author: "Sophie Laurent",
      date: "Il y a 6 heures",
      readTime: "4 min",
      views: "1.2k",
      likes: 28,
      comments: 5,
    },
    {
      id: 4,
      title: "HealthPlus déploie sa solution de télémédecine",
      excerpt: "La startup française étend sa plateforme de consultation médicale à distance dans 50 nouvelles villes.",
      company: "HealthPlus Innovation",
      category: "health",
      image: "/placeholder.svg?height=300&width=400&text=Telemedicine",
      author: "Dr. Jean Dupont",
      date: "Il y a 8 heures",
      readTime: "6 min",
      views: "956",
      likes: 22,
      comments: 7,
    },
    {
      id: 5,
      title: "EduSmart révolutionne l'apprentissage en ligne",
      excerpt: "Nouvelle plateforme d'e-learning avec IA adaptative pour personnaliser l'expérience d'apprentissage.",
      company: "EduSmart Technologies",
      category: "education",
      image: "/placeholder.svg?height=300&width=400&text=E-Learning",
      author: "Claire Moreau",
      date: "Il y a 12 heures",
      readTime: "5 min",
      views: "743",
      likes: 19,
      comments: 4,
    },
    {
      id: 6,
      title: "RetailPro optimise la chaîne d'approvisionnement",
      excerpt: "Solution blockchain pour tracer et optimiser les flux logistiques du commerce de détail.",
      company: "RetailPro Solutions",
      category: "tech",
      image: "/placeholder.svg?height=300&width=400&text=Supply+Chain",
      author: "Marc Leroy",
      date: "Il y a 1 jour",
      readTime: "8 min",
      views: "634",
      likes: 15,
      comments: 3,
    },
    {
      id: 7,
      title: "InvestCorp lance son fonds d'investissement ESG",
      excerpt:
        "Nouveau fonds de 500M€ dédié aux entreprises respectueuses de l'environnement et socialement responsables.",
      company: "InvestCorp Capital",
      category: "finance",
      image: "/placeholder.svg?height=300&width=400&text=ESG+Investment",
      author: "Anne Bertrand",
      date: "Il y a 1 jour",
      readTime: "6 min",
      views: "521",
      likes: 12,
      comments: 2,
    },
    {
      id: 8,
      title: "MedTech développe des dispositifs médicaux connectés",
      excerpt: "Nouvelle gamme d'appareils IoT pour le monitoring des patients à domicile.",
      company: "MedTech Innovations",
      category: "health",
      image: "/placeholder.svg?height=300&width=400&text=Connected+Medical",
      author: "Dr. Paul Rousseau",
      date: "Il y a 2 jours",
      readTime: "7 min",
      views: "445",
      likes: 18,
      comments: 6,
    },
  ]

  const filteredNews = regularNews.filter((news) => {
    const matchesCategory = selectedCategory === "all" || news.category === selectedCategory
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.company.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      tech: "bg-blue-100 text-blue-700",
      finance: "bg-green-100 text-green-700",
      health: "bg-red-100 text-red-700",
      energy: "bg-yellow-100 text-yellow-700",
      education: "bg-purple-100 text-purple-700",
    }
    return colors[category] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Le Header a été retiré, car il est maintenant dans app/layout.tsx */}

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            📰 Centre d'actualités B2B
          </Badge>
          <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
            ACTUALITÉS
            <br />
            <span className="font-normal">ENTREPRISES</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto font-light opacity-90">
            Restez informé des dernières innovations, partenariats et succès des entreprises de notre réseau
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl">
              <div className="flex items-center">
                <Search className="ml-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher dans les actualités..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 ml-3 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none py-3"
                />
                <Button className="bg-gradient-to-r from-rose-500 to-purple-500 text-white px-6 hover:from-rose-600 hover:to-purple-600 transition-all duration-300">
                  Rechercher
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-6 bg-white border-b border-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-600 font-medium flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer par :
              </span>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">Trier par :</span>
              <Button variant="outline" size="sm" className="border-gray-300">
                Plus récent
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-light mb-4 text-gray-800">
                À LA <span className="font-normal text-rose-600">UNE</span>
              </h2>
              <p className="text-lg text-gray-600">Les actualités les plus importantes du moment</p>
            </div>
            <Badge className="bg-rose-100 text-rose-700 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Tendances
            </Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredNews.map((news) => (
              <Card
                key={news.id}
                className="group hover:shadow-2xl transition-all duration-300 border-rose-100 hover:border-rose-300 overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {news.trending && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Tendance
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getCategoryColor(news.category)}>
                      {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {news.date}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {news.views}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-3 text-gray-800 group-hover:text-rose-600 transition-colors leading-tight">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{news.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{news.company}</p>
                        <p className="text-sm text-gray-500">Par {news.author}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {news.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {news.comments}
                      </div>
                      <span>{news.readTime} de lecture</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white">
                      Lire l'article complet
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regular News Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-light mb-4 text-gray-800">
                TOUTES LES <span className="font-normal text-rose-600">ACTUALITÉS</span>
              </h2>
              <p className="text-lg text-gray-600">
                {filteredNews.length} article{filteredNews.length > 1 ? "s" : ""}
                {selectedCategory !== "all" &&
                  ` dans la catégorie ${categories.find((c) => c.id === selectedCategory)?.label}`}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <Card
                key={news.id}
                className="group hover:shadow-xl transition-all duration-300 border-rose-100 hover:border-rose-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={getCategoryColor(news.category)}>
                      {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm p-2">
                      <Bookmark className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {news.date}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {news.views}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-rose-600 transition-colors leading-tight">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">{news.excerpt}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full flex items-center justify-center">
                        <Building2 className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{news.company}</p>
                        <p className="text-xs text-gray-500">Par {news.author}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {news.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {news.comments}
                      </div>
                    </div>
                    <span>{news.readTime} de lecture</span>
                  </div>
                  <Link href="/auth/register">
                    <Button variant="outline" className="w-full border-rose-300 text-rose-600 hover:bg-rose-50">
                     Lire l'article
                     <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8">
                Charger plus d'articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">
            RESTEZ <span className="font-normal">INFORMÉ</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-light opacity-90">
            Recevez les dernières actualités directement dans votre boîte mail
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-l-xl text-gray-700 focus:outline-none"
              />
              <Button className="bg-white text-rose-600 hover:bg-rose-50 px-5 rounded-r-xl">S'abonner</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Le Footer a été retiré, car il est maintenant dans app/layout.tsx (implicitement) */}
    </div>
  )
}