// components/dashboards/SearchResults.tsx
"use client";
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Check } from "lucide-react";

// Définir le type pour les résultats de recherche
interface CompanySearchResult {
    id: string;
    raison_sociale: string | null;
    secteur_activite: string | null;
    adresse: string | null;
    isFollowing: boolean;
}

interface SearchResultsProps {
  results: CompanySearchResult[];
  isLoading: boolean;
  setResults: React.Dispatch<React.SetStateAction<CompanySearchResult[]>>;
}

export function SearchResults({ results, isLoading, setResults }: SearchResultsProps) {
  
  const handleFollowToggle = async (companyId: string, isCurrentlyFollowing: boolean) => {
    // 1. Mise à jour optimiste de l'UI
    // L'interface est mise à jour immédiatement, sans attendre la réponse du serveur.
    setResults(prevResults => prevResults.map(company => 
        company.id === companyId ? { ...company, isFollowing: !isCurrentlyFollowing } : company
    ));

    try {
        // 2. Appel à l'API en arrière-plan
        const response = await fetch('/api/follow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                entrepriseId: companyId,
                action: isCurrentlyFollowing ? 'unfollow' : 'follow'
            })
        });

        if (!response.ok) {
            // Si l'API renvoie une erreur, annuler la mise à jour optimiste
            throw new Error('La mise à jour a échoué');
        }

    } catch (error) {
        // 3. Annulation (rollback) en cas d'erreur
        // On remet l'état initial si la requête échoue.
        setResults(prevResults => prevResults.map(company => 
            company.id === companyId ? { ...company, isFollowing: isCurrentlyFollowing } : company
        ));
        console.error("Impossible de modifier le statut de suivi :", error);
        // Optionnel : Afficher un toast d'erreur à l'utilisateur
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
        <CardContent className="p-4 text-center">
          <Loader2 className="h-6 w-6 mx-auto animate-spin text-gray-500" />
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
       <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
        <CardContent className="p-4 text-center text-gray-600">
          Aucune entreprise trouvée.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3 bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-xl">
      {results.map((company) => (
        <Card key={company.id} className="bg-white/80 border-0 shadow-none hover:bg-gray-50 transition-colors">
          <CardContent className="p-3 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">{company.raison_sociale}</h3>
              <p className="text-sm text-gray-500">{company.secteur_activite || 'Secteur non défini'}</p>
            </div>
            <Button 
                variant={company.isFollowing ? "outline" : "default"} 
                size="sm"
                onClick={() => handleFollowToggle(company.id, company.isFollowing)}
                className={company.isFollowing ? "text-green-600 border-green-300 hover:bg-green-50" : "bg-rose-500 hover:bg-rose-600"}
            >
              {company.isFollowing ? (
                <><Check className="h-4 w-4 mr-1" />Suivi</>
              ) : (
                <><Plus className="h-4 w-4 mr-1" />Suivre</>
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}