// /components/dashboards/PublicLandingPage.tsx
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown, Loader2, Map, MapPin, ArrowRight, Building2, ChevronLeft, ChevronRight, Clock, Eye, Handshake, Star, TrendingUp, Users, Calendar } from "lucide-react";
import { PublicCompanyCard } from '../PublicCompanyCard';
import { TopCompanyCard } from '../TopCompanyCard';

// Interfaces pour les données
interface CompanySearchResult {
  id: string;
  user: { name: string | null };
  secteur_activite: string | null;
  adresse: string | null;
  ville: string | null;
  pays: string | null;
  site_web: string | null;
}

interface TopRankedCompany {
  id: string;
  name: string;
  logo: string;
  sector: string;
  followerCount: number;
}


export default function PublicLandingPage() {
  const [searchCompanyName, setSearchCompanyName] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [searchCity, setSearchCity] = useState("");
  
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  
  const [searchResults, setSearchResults] = useState<CompanySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBgSlide, setCurrentBgSlide] = useState(0);

  // États pour le classement des entreprises
  const [topCompanies, setTopCompanies] = useState<TopRankedCompany[]>([]);
  const [isLoadingTop, setIsLoadingTop] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5); // Affiche 5 par défaut


  const backgroundImages = [
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop",
  ];

  const newsSlides = [
    { id: 1, title: "TechCorp lance sa nouvelle solution IA", company: "TechCorp Solutions", excerpt: "Une révolution dans l'automatisation des processus.", image: "https://placehold.co/600x400/E9D5FF/3730A3?text=Nouveauté+IA", date: "Il y a 2 heures", views: "1.2k" },
    { id: 2, title: "GreenEnergy signe un contrat majeur", company: "GreenEnergy France", excerpt: "Partenariat stratégique pour l'énergie solaire.", image: "https://placehold.co/600x400/A7F3D0/047857?text=Énergie+Solaire", date: "Il y a 4 heures", views: "856" },
  ];
  
  // useEffect pour récupérer les entreprises classées
  useEffect(() => {
    const fetchTopCompanies = async () => {
      setIsLoadingTop(true);
      try {
        const response = await fetch('/api/companies/top-ranked');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du classement');
        }
        const data = await response.json();
        setTopCompanies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingTop(false);
      }
    };

    fetchTopCompanies();
  }, []);
  
  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/api/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch suggestions for company and city
  const fetchSuggestions = useCallback(async (field: 'company' | 'city', query: string) => {
    if (query.length < 2) {
      if (field === 'company') setCompanySuggestions([]);
      if (field === 'city') setCitySuggestions([]);
      return;
    }
    try {
      const response = await fetch(`/api/suggestions?field=${field}&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (field === 'company') setCompanySuggestions(data);
      if (field === 'city') setCitySuggestions(data);
    } catch (error) {
      console.error(`Failed to fetch ${field} suggestions:`, error);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchCompanyName) fetchSuggestions('company', searchCompanyName);
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchCompanyName, fetchSuggestions]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchCity) fetchSuggestions('city', searchCity);
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchCity, fetchSuggestions]);

  // Handle search submission
  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchResults([]);
    try {
      const params = new URLSearchParams();
      if (searchCompanyName) params.append('companyName', searchCompanyName);
      if (searchCountry) params.append('country', searchCountry);
      if (searchCity) params.append('city', searchCity);

      const response = await fetch(`/api/public-search?${params.toString()}`);
      const data: CompanySearchResult[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Carousels logic
  useEffect(() => {
    const newsTimer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % newsSlides.length), 5000);
    const bgTimer = setInterval(() => setCurrentBgSlide((prev) => (prev + 1) % backgroundImages.length), 3000);
    return () => {
      clearInterval(newsTimer);
      clearInterval(bgTimer);
    };
  }, [newsSlides.length, backgroundImages.length]);
  
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + newsSlides.length) % newsSlides.length);

  return (
    <>
      <section className="relative py-20 px-6 overflow-hidden min-h-[calc(100vh-81px)] flex items-center">
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBgSlide ? "opacity-100" : "opacity-0"}`}>
              <img src={image} alt={`Background slide ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/60 via-purple-900/40 to-rose-900/60 z-10"></div>
        </div>
        
        <div className="relative z-20 container mx-auto text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            🌟 Plateforme de mise en relation B2B
          </Badge>
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight drop-shadow-2xl">
            RETROUVEZ LES ENTREPRISES<br />
            <span className="font-normal bg-gradient-to-r from-rose-200 to-purple-200 bg-clip-text text-transparent">
              EXPERTES DANS LEURS DOMAINES
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto font-light drop-shadow-lg">
            Connectez-vous avec les meilleures entreprises de votre secteur et développez votre réseau.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nom de l'entreprise..."
                  value={searchCompanyName}
                  onChange={(e) => setSearchCompanyName(e.target.value)}
                  onFocus={() => fetchSuggestions('company', searchCompanyName)}
                  className="w-full h-full pl-10 pr-4 py-3 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
                />
                {companySuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg text-left">
                    {companySuggestions.map((suggestion, index) => (
                      <li key={index} onClick={() => { setSearchCompanyName(suggestion); setCompanySuggestions([]); }} className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select value={searchCountry} onChange={(e) => setSearchCountry(e.target.value)} className="w-full h-full pl-10 pr-8 py-3 bg-transparent text-gray-700 focus:outline-none appearance-none">
                  <option value="">Tous les pays</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"/>
              </div>

              <div className="relative">
                 <input
                  type="text"
                  placeholder="Ville"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  onFocus={() => fetchSuggestions('city', searchCity)}
                  className="w-full h-full px-4 py-3 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
                />
                 {citySuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg text-left">
                    {citySuggestions.map((suggestion, index) => (
                      <li key={index} onClick={() => { setSearchCity(suggestion); setCitySuggestions([]); }} className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Button onClick={handleSearch} disabled={isLoading} className="md:col-span-4 bg-gradient-to-r from-rose-500 to-purple-500 text-white hover:from-rose-600 hover:to-purple-600 h-12">
                {isLoading ? <Loader2 className="animate-spin" /> : "Rechercher"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {hasSearched && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Résultats de la recherche ({searchResults.length})
            </h2>
            {isLoading ? (
              <div className="flex justify-center"><Loader2 className="h-12 w-12 animate-spin text-rose-500" /></div>
            ) : searchResults.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((company) => (
                  <PublicCompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <Card><CardContent className="p-8 text-center text-gray-500">
                  <Map className="h-12 w-12 mx-auto mb-4 text-gray-300"/>
                  <h3 className="text-lg font-medium">Aucun résultat</h3>
                  <p>Aucune entreprise ne correspond à vos critères. Essayez d'élargir votre recherche.</p>
              </CardContent></Card>
            )}
          </div>
        </section>
      )}

      {/* Section TOP ENTREPRISES mise à jour */}
      <section className="py-16 px-6 bg-gradient-to-br from-rose-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-gray-800">TOP <span className="font-normal text-rose-600">ENTREPRISES</span></h2>
            <p className="text-lg text-gray-600">Les entreprises les mieux notées de notre réseau</p>
          </div>
          
          {isLoadingTop ? (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin h-12 w-12 text-rose-500" />
            </div>
          ) : topCompanies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {topCompanies.slice(0, visibleCount).map((company) => (
                  <TopCompanyCard key={company.id} company={company} />
                ))}
              </div>
              
              {topCompanies.length > 5 && (
                <div className="text-center mt-12">
                  {visibleCount === 5 ? (
                    <Button onClick={() => setVisibleCount(topCompanies.length)} size="lg" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8">
                        Voir plus
                    </Button>
                  ) : (
                     <Button onClick={() => setVisibleCount(5)} size="lg" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8">
                        Voir moins
                    </Button>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">Aucune entreprise à classer pour le moment.</p>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-r from-rose-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-gray-800">ACTUALITÉS <span className="font-normal text-rose-600">ENTREPRISES</span></h2>
            <p className="text-lg text-gray-600">Suivez les dernières nouvelles de nos partenaires</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {newsSlides.map((slide) => (
                  <div key={slide.id} className="w-full flex-shrink-0">
                    <Card className="border-0 rounded-none"><CardContent className="p-0"><div className="grid md:grid-cols-2 gap-0">
                          <div className="relative h-64 md:h-80"><img src={slide.image} alt={slide.title} className="object-cover w-full h-full" /></div>
                          <div className="p-8 flex flex-col justify-center bg-white">
                            <Badge className="w-fit mb-4 bg-rose-100 text-rose-700 hover:bg-rose-100">{slide.company}</Badge>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800 leading-tight">{slide.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">{slide.excerpt}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center space-x-4"><div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{slide.date}</div><div className="flex items-center"><Eye className="h-4 w-4 mr-1" />{slide.views} vues</div></div>
                              <Button variant="ghost" className="text-rose-600 hover:text-rose-700 p-0">Lire plus →</Button>
                            </div>
                          </div>
                    </div></CardContent></Card>
                  </div>
                ))}
              </div>
            </div>
            <Button variant="outline" size="icon" className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-rose-200 hover:bg-rose-50" onClick={prevSlide}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-rose-200 hover:bg-rose-50" onClick={nextSlide}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12"><h2 className="text-4xl font-light mb-4 text-gray-800">POURQUOI <span className="font-normal text-rose-600">NOUS CHOISIR</span></h2><p className="text-lg text-gray-600">Une plateforme pensée pour l'excellence</p></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
                {icon: Users, title: "Réseau Qualifié", description: "Entreprises vérifiées et certifiées."},
                {icon: Calendar, title: "Prise de Rendez-Vous", description: "Planifiez facilement vos rencontres."},
                {icon: Star, title: "Système de Notation", description: "Évaluez et consultez les avis."}
            ].map((feature, index) => (
              <Card key={index} className="group text-center hover:shadow-xl transition-all duration-300 border-rose-100 hover:border-rose-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-rose-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"><feature.icon className="h-8 w-8 text-white" /></div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}