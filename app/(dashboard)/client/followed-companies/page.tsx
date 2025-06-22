// app/(dashboard)/client/followed-companies/page.tsx
"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, MapPin, Star, Plus, X, ArrowRight } from "lucide-react"
import Link from "next/link"

// Note: Remplacez ces données simulées par une récupération de données personalisée
export default function FollowedCompaniesPage() {
  const [followedCompanies, setFollowedCompanies] = useState([
    {
      id_entreprise: 1,
      nom_entreprise: "TechCorp Solutions",
      secteur_activite: "Technologie",
      localisation: "Paris, France",
      logo: "https://placehold.co/100x100/DBEAFE/2563EB?text=TC",
      note_moyenne: 4.7,
    },
    {
      id_entreprise: 2,
      nom_entreprise: "GreenEnergy France",
      secteur_activite: "Énergie renouvelable",
      localisation: "Lyon, France",
      logo: "https://placehold.co/100x100/DCFCE7/2E8B57?text=GE",
      note_moyenne: 4.5,
    }
  ])

  const unfollowCompany = (id: number) => {
    setFollowedCompanies(companies => companies.filter(c => c.id_entreprise !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mes Entreprises Suivies</h1>
            <Link href="/client/suggestions">
                <Button variant="outline">
                    <Star className="h-4 w-4 mr-2" />
                    Voir les suggestions
                </Button>
            </Link>
        </div>

        <div className="space-y-6">
            {followedCompanies.length > 0 ? (
                followedCompanies.map((company) => (
                    <Card key={company.id_entreprise} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex space-x-4">
                                    <img src={company.logo} alt={company.nom_entreprise} className="w-16 h-16 rounded-lg" />
                                    <div>
                                        <h3 className="font-bold text-xl">{company.nom_entreprise}</h3>
                                        <div className="flex items-center mt-1 space-x-2">
                                            <Badge variant="outline">{company.secteur_activite}</Badge>
                                            <div className="flex items-center text-sm text-gray-600"><Star className="h-4 w-4 mr-1 text-amber-400 fill-current" />{company.note_moyenne}</div>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="destructive" size="sm" onClick={() => unfollowCompany(company.id_entreprise)}>
                                    <X className="h-4 w-4 mr-1" /> Ne plus suivre
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Card>
                    <CardContent className="p-8 text-center">
                        <p>Vous ne suivez aucune entreprise pour le moment.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    </div>
  )
}