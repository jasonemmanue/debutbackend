"use client"

import React from 'react'
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
import { useState, useEffect } from "react"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentBgSlide, setCurrentBgSlide] = useState(0)
 
  const isCompany = false;
  const companyName = null;

  // Images pour l'arrière-plan de la section hero
  const backgroundImages = [
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop",
  ];

  const newsSlides = [
    {
      id: 1,
      title: "TechCorp lance sa nouvelle solution IA",
      company: "TechCorp Solutions",
      excerpt: "Une révolution dans l'automatisation des processus métier avec une IA de dernière génération.",
      image: "https://placehold.co/600x400/E9D5FF/3730A3?text=Nouveauté+IA",
      date: "Il y a 2 heures",
      views: "1.2k",
    },
    {
      id: 2,
      title: "GreenEnergy signe un contrat majeur",
      company: "GreenEnergy France",
      excerpt: "Partenariat stratégique pour l'installation de 500 MW d'énergie solaire en région PACA.",
      image: "https://placehold.co/600x400/A7F3D0/047857?text=Énergie+Solaire",
      date: "Il y a 4 heures",
      views: "856",
    },
    {
      id: 3,
      title: "FinanceMax ouvre ses bureaux à Lyon",
      company: "FinanceMax Group",
      excerpt: "Expansion nationale avec l'ouverture d'un nouveau centre de services financiers.",
      image: "https://placehold.co/600x400/FBCFE8/9D174D?text=Finance+Expansion",
      date: "Il y a 6 heures",
      views: "642",
    },
  ]

  const topCompanies = [
    { name: "TechCorp", logo: "https://placehold.co/80x80/E0E7FF/3730A3?text=TC", sector: "Technologie" },
    { name: "GreenEnergy", logo: "https://placehold.co/80x80/D1FAE5/065F46?text=GE", sector: "Énergie" },
    { name: "FinanceMax", logo: "https://placehold.co/80x80/FEF2F2/991B1B?text=FM", sector: "Finance" },
    { name: "HealthPlus", logo: "https://placehold.co/80x80/FEFEE2/854D0E?text=HP", sector: "Santé" },
    { name: "EduSmart", logo: "https://placehold.co/80x80/F5F3FF/5B21B6?text=ES", sector: "Éducation" },
    { name: "RetailPro", logo: "https://placehold.co/80x80/FFF1F2/9F1239?text=RP", sector: "Commerce" },
  ]

  useEffect(() => {
    const newsTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsSlides.length)
    }, 5000)
    return () => clearInterval(newsTimer)
  }, [newsSlides.length])

  // Timer pour les images de fond de la section hero
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgSlide((prev) => (prev + 1) % backgroundImages.length)
    }, 3000)
    return () => clearInterval(bgTimer)
  }, [backgroundImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsSlides.length) % newsSlides.length)
  }

  return (
    <>
      {isCompany && companyName && (
        <div className="text-center py-4 bg-white/50 backdrop-blur-md">
          <h2 className="text-3xl font-serif italic text-purple-700 decoration-wavy underline decoration-rose-400">
            {companyName}
          </h2>
        </div>
      )}

      {/* Hero Section avec arrière-plan d'images */}
      <section className="relative py-20 px-6 overflow-hidden min-h-[calc(100vh-81px)] flex items-center">
        <div className="absolute inset-0">
          {/* Couche des images */}
          {backgroundImages.map((image, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBgSlide ? "opacity-100" : "opacity-0"}`}>
              <img
                src={image}
                alt={`Background slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Couche des superpositions de couleur (overlays) */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/60 via-purple-900/40 to-rose-900/60 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 z-10"></div>
        </div>
        
        {/* Contenu textuel et boutons */}
        <div className="relative z-20 container mx-auto text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm animate-pulse">🌟 Plateforme de mise en relation B2B</Badge>
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight drop-shadow-2xl">
            RETROUVEZ LES ENTREPRISES<br />
            <span className="font-normal bg-gradient-to-r from-rose-200 to-purple-200 bg-clip-text text-transparent">EXPERTES DANS LEURS DOMAINES</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto font-light drop-shadow-lg">
            Connectez-vous avec les meilleures entreprises de votre secteur et développez votre réseau professionnel avec excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/auth/register">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 font-semibold text-lg px-8 py-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                Découvrir les entreprises <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white/10 hover:text-white text-lg px-8 py-6 [text-shadow:0_1px_3px_rgb(0_0_0_/_0.5)] transform hover:scale-105 transition-all duration-300"
              >
                Inscrire mon entreprise
              </Button>
            </a>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl">
              <div className="flex items-center">
                <Search className="ml-4 h-5 w-5 text-gray-400" />
                <input type="text" placeholder="Rechercher une entreprise, un service..." className="flex-1 ml-3 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none py-3" />
                <Button className="bg-gradient-to-r from-rose-500 to-purple-500 text-white px-6 hover:from-rose-600 hover:to-purple-600 transition-all duration-300">Rechercher</Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicateurs et contrôles de navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex space-x-2">
            {backgroundImages.map((_, index) => (
              <button 
                key={index} 
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentBgSlide ? "bg-white w-8 shadow-lg" : "bg-white/50 hover:bg-white/70"}`} 
                onClick={() => setCurrentBgSlide(index)} 
              />
            ))}
          </div>
        </div>
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300" onClick={() => setCurrentBgSlide((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length)}>
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300" onClick={() => setCurrentBgSlide((prev) => (prev + 1) % backgroundImages.length)}>
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </section>

      {/* Section TOP ENTREPRISES sans arrière-plan d'images */}
      <section className="py-16 px-6 bg-gradient-to-br from-rose-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-gray-800">
              TOP <span className="font-normal text-rose-600">ENTREPRISES</span>
            </h2>
            <p className="text-lg text-gray-600">Les entreprises les mieux notées de notre réseau</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {topCompanies.map((company, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-rose-100 hover:border-rose-300 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-rose-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img src={company.logo} alt={company.name} width={40} height={40} className="rounded-lg" />
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
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {newsSlides.map((slide) => (
                  <div key={slide.id} className="w-full flex-shrink-0">
                    <Card className="border-0 rounded-none">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="relative h-64 md:h-80">
                            <img src={slide.image} alt={slide.title} className="object-cover w-full h-full" />
                          </div>
                          <div className="p-8 flex flex-col justify-center bg-white">
                            <Badge className="w-fit mb-4 bg-rose-100 text-rose-700 hover:bg-rose-100">{slide.company}</Badge>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800 leading-tight">{slide.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">{slide.excerpt}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{slide.date}</div>
                                <div className="flex items-center"><Eye className="h-4 w-4 mr-1" />{slide.views} vues</div>
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
            <Button variant="outline" size="icon" className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-rose-200 hover:bg-rose-50" onClick={prevSlide}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-rose-200 hover:bg-rose-50" onClick={nextSlide}><ChevronRight className="h-4 w-4" /></Button>
            <div className="flex justify-center mt-6 space-x-2">
              {newsSlides.map((_, index) => (
                <button key={index} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-rose-500 w-8" : "bg-rose-200 hover:bg-rose-300"}`} onClick={() => setCurrentSlide(index)} />
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
            {[{icon: Users, title: "Réseau Qualifié", description: "Entreprises vérifiées et certifiées pour garantir la qualité des échanges"}, {icon: Calendar, title: "Prise de Rendez-Vous", description: "Planifiez facilement vos rencontres professionnelles en quelques clics"}, {icon: Star, title: "Système de Notation", description: "Évaluez et consultez les avis pour faire les meilleurs choix"}].map((feature, index) => (
              <Card key={index} className="group text-center hover:shadow-xl transition-all duration-300 border-rose-100 hover:border-rose-300">
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
            <a href="/auth/register"><Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 font-semibold text-lg px-8 py-6">Commencer maintenant</Button></a>
            <a href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                En savoir plus
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}