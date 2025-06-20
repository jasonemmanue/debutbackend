"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Building2, ArrowRight, TrendingUp, Grid, List } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function CategoriesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      id: "technology",
      name: "Technologie",
      description: "Développement logiciel, IA, cybersécurité, fintech",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      companies: 156,
      growth: "+12%",
      featured: ["TechCorp Solutions", "InnovateAI", "CyberSecure Pro"],
      image: "/placeholder.svg?height=300&width=400&text=Technology",
      trending: true,
    },
    {
      id: "finance",
      name: "Finance",
      description: "Banques, assurances, investissement, fintech",
      icon: "💰",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      companies: 89,
      growth: "+8%",
      featured: ["FinanceMax Group", "InvestCorp Capital", "BankTech"],
      image: "/placeholder.svg?height=300&width=400&text=Finance",
      trending: false,
    },
    {
      id: "health",
      name: "Santé",
      description: "Médecine, biotechnologie, dispositifs médicaux",
      icon: "🏥",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      companies: 67,
      growth: "+15%",
      featured: ["HealthPlus Innovation", "MedTech Solutions", "BioLab"],
      image: "/placeholder.svg?height=300&width=400&text=Healthcare",
      trending: true,
    },
    {
      id: "energy",
      name: "Énergie",
      description: "Énergies renouvelables, pétrole, gaz, nucléaire",
      icon: "⚡",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      companies: 45,
      growth: "+20%",
      featured: ["GreenEnergy France", "SolarPower Corp", "WindTech"],
      image: "/placeholder.svg?height=300&width=400&text=Energy",
      trending: true,
    },
    {
      id: "education",
      name: "Éducation",
      description: "E-learning, formation, universités, EdTech",
      icon: "🎓",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      companies: 34,
      growth: "+10%",
      featured: ["EduSmart Technologies", "LearnOnline", "SkillBoost"],
      image: "/placeholder.svg?height=300&width=400&text=Education",
      trending: false,
    },
    {
      id: "retail",
      name: "Commerce",
      description: "E-commerce, retail, distribution, logistique",
      icon: "🛍️",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      companies: 78,
      growth: "+6%",
      featured: ["RetailPro Solutions", "E-Shop Plus", "LogiFlow"],
      image: "/placeholder.svg?height=300&width=400&text=Retail",
      trending: false,
    },
    {
      id: "manufacturing",
      name: "Industrie",
      description: "Manufacturing, automobile, aéronautique, chimie",
      icon: "🏭",
      color: "from-gray-500 to-slate-500",
      bgColor: "bg-gray-50",
      textColor: "text-gray-700",
      companies: 92,
      growth: "+4%",
      featured: ["ManufacturingPro", "AutoTech Industries", "AeroSpace"],
      image: "/placeholder.svg?height=300&width=400&text=Manufacturing",
      trending: false,
    },
    {
      id: "consulting",
      name: "Conseil",
      description: "Conseil en management, stratégie, transformation",
      icon: "💼",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      companies: 123,
      growth: "+7%",
      featured: ["ConsultPro", "Strategy Partners", "Transform Co"],
      image: "/placeholder.svg?height=300&width=400&text=Consulting",
      trending: false,
    },
  ]

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                  B2B Connect
                </h1>
                <p className="text-xs text-rose-500/70 font-medium">CATÉGORIES</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-rose-600 transition-colors duration-300 font-medium">
                Accueil
              </Link>
              <Link href="/companies/categories" className="text-rose-600 font-medium">
                Catégories
              </Link>
              <Link
                href="/companies/top"
                className="text-gray-600 hover:text-rose-600 transition-colors duration-300 font-medium"
              >
                Top Entreprises
              </Link>
              <Link
                href="/news"
                className="text-gray-600 hover:text-rose-600 transition-colors duration-300 font-medium"
              >
                Actualités
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-600 hover:text-rose-600">
                  Se connecter
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white shadow-lg">
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            🏢 Explorez par secteur d'activité
          </Badge>
          <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
            CATÉGORIES
            <br />
            <span className="font-normal">D'ENTREPRISES</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto font-light opacity-90">
            Découvrez les entreprises par secteur d'activité et trouvez vos partenaires idéaux
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl">
              <div className="flex items-center">
                <Search className="ml-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une catégorie..."
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

      {/* Stats Section */}
      <section className="py-12 px-6 bg-white border-b border-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-rose-600 mb-2">8</div>
              <div className="text-gray-600">Secteurs d'activité</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">684</div>
              <div className="text-gray-600">Entreprises référencées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-rose-600 mb-2">+11%</div>
              <div className="text-gray-600">Croissance moyenne</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
              <div className="text-gray-600">Note moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* View Controls */}
      <section className="py-6 px-6 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">
                {filteredCategories.length} catégorie{filteredCategories.length > 1 ? "s" : ""}
              </span>
              {searchQuery && (
                <Badge variant="outline" className="border-rose-300 text-rose-600">
                  Recherche: "{searchQuery}"
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-rose-500 hover:bg-rose-600" : ""}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-rose-500 hover:bg-rose-600" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid/List */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
            {filteredCategories.map((category) => (
              <Card
                key={category.id}
                className={`group hover:shadow-2xl transition-all duration-300 border-rose-100 hover:border-rose-300 overflow-hidden ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                {viewMode === "grid" ? (
                  <>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        {category.trending && (
                          <Badge className="bg-red-500 text-white">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Tendance
                          </Badge>
                        )}
                        <Badge className={`${category.bgColor} ${category.textColor} border-0`}>
                          {category.growth}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="text-4xl mb-2">{category.icon}</div>
                        <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-1" />
                            {category.companies} entreprises
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {category.growth}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Entreprises vedettes :</p>
                        <div className="flex flex-wrap gap-1">
                          {category.featured.map((company, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Link href={`/companies/categories/${category.id}`}>
                        <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white">
                          Explorer {category.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <div className="relative w-48 h-32 overflow-hidden flex-shrink-0">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-500">{category.companies} entreprises</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {category.trending && (
                            <Badge className="bg-red-500 text-white">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Tendance
                            </Badge>
                          )}
                          <Badge className={`${category.bgColor} ${category.textColor} border-0`}>
                            {category.growth}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{category.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {category.featured.slice(0, 2).map((company, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {company}
                            </Badge>
                          ))}
                          {category.featured.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{category.featured.length - 2}
                            </Badge>
                          )}
                        </div>

                        <Link href={`/companies/categories/${category.id}`}>
                          <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                            Explorer
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">
            VOTRE SECTEUR <span className="font-normal">N'EST PAS LISTÉ ?</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-light opacity-90">
            Contactez-nous pour ajouter votre secteur d'activité à notre plateforme
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 font-semibold text-lg px-8 py-6">
              Nous contacter
            </Button>
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                Inscrire mon entreprise
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">B2B Connect</span>
              </div>
              <p className="text-gray-400">
                Le réseau d'affaires de référence pour connecter les entreprises d'excellence
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-rose-400">Catégories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/companies/categories/technology" className="hover:text-white transition-colors">
                    Technologie
                  </Link>
                </li>
                <li>
                  <Link href="/companies/categories/finance" className="hover:text-white transition-colors">
                    Finance
                  </Link>
                </li>
                <li>
                  <Link href="/companies/categories/health" className="hover:text-white transition-colors">
                    Santé
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-rose-400">Entreprises</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/companies/top" className="hover:text-white transition-colors">
                    Top entreprises
                  </Link>
                </li>
                <li>
                  <Link href="/companies/partnership" className="hover:text-white transition-colors">
                    Partenariats
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-white transition-colors">
                    S'inscrire
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-rose-400">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Aide
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    CGU
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 B2B Connect. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
