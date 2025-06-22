// app/(dashboard)/client/suggestions/page.tsx
"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, MapPin, Star, Plus, X } from "lucide-react"

// Note: Données simulées. Vous devrez implémenter une logique de suggestion basée sur les
// intérêts de l'utilisateur et les entreprises qu'il ne suit pas encore.
export default function CompanySuggestionsPage() {
  const [suggestedCompanies, setSuggestedCompanies] = useState([
    {
      id_entreprise: 3,
      nom_entreprise: "DataInsights",
      secteur_activite: "Data Science",
      logo: "https://placehold.co/100x100/E0E7FF/3730A3?text=DI",
      isFollowing: false,
      reason: "Basé sur votre intérêt pour la Technologie"
    },
    {
      id_entreprise: 4,
      nom_entreprise: "WebCraft Studio",
      secteur_activite: "Développement Web",
      logo: "https://placehold.co/100x100/F0FDF4/16A34A?text=WC",
      isFollowing: false,
      reason: "Populaire parmi les développeurs"
    }
  ])

  const toggleFollow = (id: number) => {
    setSuggestedCompanies(companies =>
      companies.map(c => c.id_entreprise === id ? { ...c, isFollowing: !c.isFollowing } : c)
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-6 sm:p-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Suggestions d'Entreprises</h1>
            <p className="text-gray-600">Basé sur vos centres d'intérêt et votre activité</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedCompanies.map((company) => (
                <Card key={company.id_entreprise}>
                    <CardContent className="p-6 text-center">
                        <img src={company.logo} alt={company.nom_entreprise} className="w-16 h-16 rounded-full mx-auto mb-4" />
                        <h3 className="font-bold text-lg">{company.nom_entreprise}</h3>
                        <Badge variant="secondary" className="mt-1 mb-2">{company.reason}</Badge>
                        <p className="text-sm text-gray-500 mb-4">{company.secteur_activite}</p>
                        <Button className="w-full" onClick={() => toggleFollow(company.id_entreprise)}>
                            {company.isFollowing ? <><X className="h-4 w-4 mr-1" />Ne plus suivre</> : <><Plus className="h-4 w-4 mr-1" />Suivre</>}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  )
}