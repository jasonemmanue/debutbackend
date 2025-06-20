"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Users,
  Calendar,
  Star,
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/Header" // Importation du Header dynamique
import { useSession } from "next-auth/react"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const { data: session } = useSession()

  // @ts-ignore
  const isCompany = session?.user?.type === 'entreprise'
  // @ts-ignore
  const companyName = isCompany ? session?.user?.name : null

  const heroImages = [
    "/placeholder.svg?height=800&width=1200&text=Entreprises+Tech",
    "/placeholder.svg?height=800&width=1200&text=Réunions+Business",
    "/placeholder.svg?height=800&width=1200&text=Networking+Events",
    "/placeholder.svg?height=800&width=1200&text=Innovation+Hub",
    "/placeholder.svg?height=800&width=1200&text=Success+Stories",
  ]

  const newsSlides = [
    {
      id: 1,
      title: "TechCorp lance sa nouvelle solution IA",
      company: "TechCorp Solutions",
      excerpt: "Une révolution dans l'automatisation des processus métier avec une IA de dernière génération.",
      image: "/placeholder.svg?height=200&width=300",
      date: "Il y a 2 heures",
      views: "1.2k",
    },
    {
      id: 2,
      title: "GreenEnergy signe un contrat majeur",
      company: "GreenEnergy France",
      excerpt: "Partenariat stratégique pour l'installation de 500 MW d'énergie solaire en région PACA.",
      image: "/placeholder.svg?height=200&width=300",
      date: "Il y a 4 heures",
      views: "856",
    },
    {
      id: 3,
      title: "FinanceMax ouvre ses bureaux à Lyon",
      company: "FinanceMax Group",
      excerpt: "Expansion nationale avec l'ouverture d'un nouveau centre de services financiers.",
      image: "/placeholder.svg?height=200&width=300",
      date: "Il y a 6 heures",
      views: "642",
    },
  ]

  const topCompanies = [
    { name: "TechCorp", logo: "/placeholder.svg?height=80&width=80", sector: "Technologie" },
    { name: "GreenEnergy", logo: "/placeholder.svg?height=80&width=80", sector: "Énergie" },
    { name: "FinanceMax", logo: "/placeholder.svg?height=80&width=80", sector: "Finance" },
    { name: "HealthPlus", logo: "/placeholder.svg?height=80&width=80", sector: "Santé" },
    { name: "EduSmart", logo: "/placeholder.svg?height=80&width=80", sector: "Éducation" },
    { name: "RetailPro", logo: "/placeholder.svg?height=80&width=80", sector: "Commerce" },
  ]

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(heroTimer)
  }, [heroImages.length])

  useEffect(() => {
    const newsTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsSlides.length)
    }, 5000)
    return () => clearInterval(newsTimer)
  }, [newsSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsSlides.length) % newsSlides.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      <Header />
      
      {isCompany && companyName && (
        <div className="text-center py-4 bg-white/50 backdrop-blur-md">
          <h2 className="text-3xl font-serif italic text-purple-700 decoration-wavy underline decoration-rose-400">
            {companyName}
          </h2>
        </div>
      )}
      
      <section className="relative py-20 px-6 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHeroSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Hero slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/60 via-purple-900/40 to-rose-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
        </div>
        <div className="relative z-10 container mx-auto text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm animate-pulse">
            🌟 Plateforme de mise en relation B2B
          </Badge>
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight drop-shadow-2xl">
            RETROUVEZ LES ENTREPRISES
            <br />
            <span className="font-normal bg-gradient-to-r from-rose-200 to-purple-200 bg-clip-text text-transparent">
              EXPERTES DANS LEURS DOMAINES
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto font-light drop-shadow-lg">
            Connectez-vous avec les meilleures entreprises de votre secteur et développez votre réseau professionnel
            avec excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-white text-rose-600 hover:bg-rose-50 font-semibold text-lg px-8 py-6 shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Découvrir les entreprises
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              >
                Inscrire mon entreprise
              </Button>
            </Link>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl">
              <div className="flex items-center">
                <Search className="ml-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une entreprise, un service..."
                  className="flex-1 ml-3 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none py-3"
                />
                <Button className="bg-gradient-to-r from-rose-500 to-purple-500 text-white px-6 hover:from-rose-600 hover:to-purple-600 transition-all duration-300">
                  Rechercher
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentHeroSlide ? "bg-white w-8 shadow-lg" : "bg-white/50 hover:bg-white/70"
                }`}
                onClick={() => setCurrentHeroSlide(index)}
              />
            ))}
          </div>
        </div>
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          onClick={() => setCurrentHeroSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length)}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-gray-800">
              TOP <span className="font-normal text-rose-600">ENTREPRISES</span>
            </h2>
            <p className="text-lg text-gray-600">Les entreprises les mieux notées de notre réseau</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {topCompanies.map((company, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-rose-100 hover:border-rose-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-rose-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.sector}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-r from-rose-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-gray-800">
              ACTUALITÉS <span className="font-normal text-rose-600">ENTREPRISES</span>
            </h2>
            <p className="text-lg text-gray-600">Suivez les dernières nouvelles de nos partenaires</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {newsSlides.map((slide) => (
                  <div key={slide.id} className="w-full flex-shrink-0">
                    <Card className="border-0 rounded-none">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="relative h-64 md:h-80">
                            <Image
                              src={slide.image || "/placeholder.svg"}
                              alt={slide.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-8 flex flex-col justify-center bg-white">
                            <Badge className="w-fit mb-4 bg-rose-100 text-rose-700 hover:bg-rose-100">
                              {slide.company}
                            </Badge>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800 leading-tight">{slide.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">{slide.excerpt}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {slide.date}
                                </div>
                                <div className="flex items-center">
                                  <Eye className="h-4 w-4 mr-1" />
                                  {slide.views} vues
                                </div>
                              </div>
                              <Button variant="ghost" className="text-rose-600 hover:text-rose-700 p-0">
                                Lire plus →
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-rose-200 hover:bg-rose-50"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-rose-200 hover:bg-rose-50"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="flex justify-center mt-6 space-x-2">
              {newsSlides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-rose-500 w-8" : "bg-rose-200 hover:bg-rose-300"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-gray-800">
              POURQUOI <span className="font-normal text-rose-600">NOUS CHOISIR</span>
            </h2>
            <p className="text-lg text-gray-600">Une plateforme pensée pour l'excellence</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Réseau Qualifié",
                description: "Entreprises vérifiées et certifiées pour garantir la qualité des échanges",
              },
              {
                icon: Calendar,
                title: "Prise de Rendez-Vous",
                description: "Planifiez facilement vos rencontres professionnelles en quelques clics",
              },
              {
                icon: Star,
                title: "Système de Notation",
                description: "Évaluez et consultez les avis pour faire les meilleurs choix",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group text-center hover:shadow-xl transition-all duration-300 border-rose-100 hover:border-rose-300"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-rose-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">
            REJOIGNEZ NOTRE <span className="font-normal">RÉSEAU D'EXCELLENCE</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-light opacity-90">
            Développez votre activité en vous connectant avec les meilleures entreprises de votre secteur
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 font-semibold text-lg px-8 py-6">
                Commencer maintenant
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
              <h4 className="font-semibold mb-4 text-rose-400">Entreprises</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    S'inscrire
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Fonctionnalités
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-rose-400">Clients</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Rechercher
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Secteurs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Actualités
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-rose-400">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Aide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
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