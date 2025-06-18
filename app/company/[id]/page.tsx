"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Calendar,
  MessageCircle,
  Share2,
  Heart,
  Users,
  Award,
  Clock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function CompanyProfilePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const [isLiked, setIsLiked] = useState(false)

  // Données simulées de l'entreprise
  const company = {
    id: "techcorp-solutions",
    name: "TechCorp Solutions",
    tagline: "Innovation technologique au service de votre entreprise",
    description:
      "TechCorp Solutions est une entreprise leader dans le développement de solutions technologiques innovantes. Nous accompagnons les entreprises dans leur transformation digitale avec des solutions sur mesure et un service client d'exception.",
    sector: "Technologie",
    founded: "2015",
    employees: "50-100",
    location: "Paris, France",
    website: "https://techcorp-solutions.com",
    email: "contact@techcorp-solutions.com",
    phone: "+33 1 23 45 67 89",
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    logo: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=400&width=800",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Bureau+Principal",
      "/placeholder.svg?height=300&width=400&text=Équipe+Développement",
      "/placeholder.svg?height=300&width=400&text=Salle+de+Réunion",
      "/placeholder.svg?height=300&width=400&text=Espace+Créatif",
      "/placeholder.svg?height=300&width=400&text=Laboratoire+Innovation",
    ],
    services: [
      {
        name: "Développement Web",
        description: "Applications web modernes et performantes",
        price: "À partir de 5000€",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Applications Mobile",
        description: "Apps iOS et Android natives et hybrides",
        price: "À partir de 8000€",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Consulting IT",
        description: "Conseil en stratégie technologique",
        price: "500€/jour",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    certifications: ["ISO 9001", "RGPD Compliant", "Agile Certified"],
    socialProof: {
      clientsCount: 150,
      projectsCompleted: 300,
      yearsExperience: 9,
    },
  }

  const reviews = [
    {
      id: 1,
      author: "Marie Dubois",
      company: "StartupTech",
      rating: 5,
      date: "Il y a 2 semaines",
      comment:
        "Excellente collaboration avec TechCorp ! Ils ont développé notre application mobile en respectant parfaitement nos délais et notre budget. L'équipe est très professionnelle.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      author: "Pierre Martin",
      company: "E-Commerce Plus",
      rating: 5,
      date: "Il y a 1 mois",
      comment:
        "Service client exceptionnel et expertise technique au top. Notre site e-commerce a vu ses performances multipliées par 3 après leur intervention.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      author: "Sophie Laurent",
      company: "FinanceCorpPro",
      rating: 4,
      date: "Il y a 2 mois",
      comment:
        "Très satisfaite du travail réalisé. L'équipe est à l'écoute et propose des solutions innovantes. Je recommande vivement !",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % company.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + company.gallery.length) % company.gallery.length)
  }

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
              </div>
            </Link>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="text-gray-600 hover:text-rose-600">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
              <Button
                variant="ghost"
                className={`${isLiked ? "text-rose-600" : "text-gray-600"} hover:text-rose-600`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Ajouté" : "Ajouter"}
              </Button>
              <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contacter
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="h-80 relative overflow-hidden">
          <Image src={company.coverImage || "/placeholder.svg"} alt={company.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="relative -mt-20 z-10">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={company.logo || "/placeholder.svg"}
                        alt={company.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    {company.verified && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-800">{company.name}</h1>
                      <Badge className="bg-rose-100 text-rose-700">{company.sector}</Badge>
                    </div>
                    <p className="text-lg text-gray-600 mb-4">{company.tagline}</p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {company.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {company.employees} employés
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Fondée en {company.founded}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {company.rating} ({company.reviewCount} avis)
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white">
                      <Calendar className="h-4 w-4 mr-2" />
                      Prendre RDV
                    </Button>
                    <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="container mx-auto px-6 py-8">
        <div className="flex space-x-8 border-b border-gray-200">
          {[
            { id: "overview", label: "Présentation" },
            { id: "services", label: "Services" },
            { id: "gallery", label: "Galerie" },
            { id: "reviews", label: "Avis" },
            { id: "contact", label: "Contact" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === tab.id ? "text-rose-600 border-b-2 border-rose-600" : "text-gray-600 hover:text-rose-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">À propos de {company.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-6">{company.description}</p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-rose-600 mb-2">{company.socialProof.clientsCount}+</div>
                        <div className="text-gray-600">Clients satisfaits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {company.socialProof.projectsCompleted}+
                        </div>
                        <div className="text-gray-600">Projets réalisés</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-rose-600 mb-2">
                          {company.socialProof.yearsExperience}
                        </div>
                        <div className="text-gray-600">Années d'expérience</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {company.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="border-green-300 text-green-700">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos Services</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {company.services.map((service, index) => (
                    <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.name}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-rose-600">{service.price}</span>
                          <Button size="sm" className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                            En savoir plus
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === "gallery" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Galerie</h2>

                {/* Main Image */}
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={company.gallery[currentImageIndex] || "/placeholder.svg"}
                    alt={`Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {company.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-5 gap-4">
                  {company.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                        index === currentImageIndex ? "ring-2 ring-rose-500" : "hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Avis clients</h2>
                  <Button className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">Laisser un avis</Button>
                </div>

                {/* Rating Summary */}
                <Card className="bg-gradient-to-r from-rose-50 to-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-800 mb-2">{company.rating}</div>
                        <div className="flex items-center justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(company.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">{company.reviewCount} avis</div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center space-x-2 mb-1">
                            <span className="text-sm w-8">{stars}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-500 h-2 rounded-full"
                                style={{
                                  width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">
                              {stars === 5 ? 89 : stars === 4 ? 25 : stars === 3 ? 7 : stars === 2 ? 4 : 2}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.author}
                              width={48}
                              height={48}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-800">{review.author}</h4>
                                <p className="text-sm text-gray-600">{review.company}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center mb-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="text-sm text-gray-500">{review.date}</p>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Nous contacter</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations de contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-rose-600" />
                        <span>{company.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-rose-600" />
                        <span>{company.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-rose-600" />
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-rose-600 hover:text-rose-700 flex items-center"
                        >
                          {company.website}
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-rose-600" />
                        <span>{company.location}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Envoyer un message</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Prénom"
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                          />
                          <input
                            type="text"
                            placeholder="Nom"
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                          />
                        </div>
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                        <input
                          type="text"
                          placeholder="Sujet"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                        <textarea
                          placeholder="Votre message..."
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                        ></textarea>
                        <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white">
                          Envoyer le message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Prendre rendez-vous
                </Button>
                <Button variant="outline" className="w-full border-rose-300 text-rose-600 hover:bg-rose-50">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Envoyer un message
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler maintenant
                </Button>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Horaires d'ouverture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {[
                  { day: "Lundi", hours: "9h00 - 18h00" },
                  { day: "Mardi", hours: "9h00 - 18h00" },
                  { day: "Mercredi", hours: "9h00 - 18h00" },
                  { day: "Jeudi", hours: "9h00 - 18h00" },
                  { day: "Vendredi", hours: "9h00 - 18h00" },
                  { day: "Samedi", hours: "Fermé" },
                  { day: "Dimanche", hours: "Fermé" },
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{schedule.day}</span>
                    <span className={schedule.hours === "Fermé" ? "text-red-600" : "text-gray-800"}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Similar Companies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entreprises similaires</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "InnovTech", rating: 4.6, sector: "Technologie" },
                  { name: "DigitalPro", rating: 4.4, sector: "Technologie" },
                  { name: "WebExperts", rating: 4.7, sector: "Technologie" },
                ].map((similar, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{similar.name}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">{similar.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{similar.sector}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
