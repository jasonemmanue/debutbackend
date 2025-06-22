// /app/(dashboard)/client/followed-companies/FollowedCompaniesClient.tsx
"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Company {
  id_entreprise: string;
  nom_entreprise: string;
  secteur_activite: string;
}

interface FollowedCompaniesClientProps {
    initialCompanies: Company[];
}

export function FollowedCompaniesClient({ initialCompanies }: FollowedCompaniesClientProps) {
  const [companies, setCompanies] = useState(initialCompanies);

  const unfollowCompany = async (id: string) => {
    const originalCompanies = [...companies];
    setCompanies(currentCompanies => currentCompanies.filter(c => c.id_entreprise !== id));

    try {
        await fetch('/api/follow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                entrepriseId: id,
                action: 'unfollow'
            })
        });
    } catch (error) {
        setCompanies(originalCompanies); // Revert on error
        console.error("Failed to unfollow company", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mes Entreprises Suivies</h1>

        <div className="space-y-6">
            {companies.length > 0 ? (
                companies.map((company) => (
                    <Card key={company.id_entreprise} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-xl">{company.nom_entreprise}</h3>
                                <Badge variant="secondary" className="mt-1">{company.secteur_activite}</Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Link href={`/company/${company.id_entreprise}`} passHref>
                                     <Button variant="outline" size="sm">
                                        <ExternalLink className="h-4 w-4 mr-1" /> Voir l'entreprise
                                     </Button>
                                </Link>
                                <Button variant="destructive" size="sm" onClick={() => unfollowCompany(company.id_entreprise)}>
                                    <X className="h-4 w-4 mr-1" /> Ne plus suivre
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Card>
                    <CardContent className="p-8 text-center text-gray-500">
                        <p>Vous ne suivez aucune entreprise. Utilisez la recherche pour en découvrir !</p>
                    </CardContent>
                </Card>
            )}
        </div>
    </div>
  );
}