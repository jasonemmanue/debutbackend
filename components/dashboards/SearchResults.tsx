// /components/dashboards/SearchResults.tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Check } from "lucide-react";

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
    // Optimistic UI update
    setResults(prevResults => prevResults.map(company => 
        company.id === companyId ? { ...company, isFollowing: !isCurrentlyFollowing } : company
    ));

    try {
        await fetch('/api/follow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                entrepriseId: companyId,
                action: isCurrentlyFollowing ? 'unfollow' : 'follow'
            })
        });
    } catch (error) {
        // Revert on error
        setResults(prevResults => prevResults.map(company => 
            company.id === companyId ? { ...company, isFollowing: isCurrentlyFollowing } : company
        ));
        console.error("Failed to toggle follow state", error);
    }
  };

  if (isLoading) {
    return <div className="text-center p-8"><Loader2 className="mx-auto animate-spin" /></div>;
  }

  if (results.length === 0) {
    return null; // Ou un message "Aucun résultat" si vous préférez
  }

  return (
    <div className="space-y-4">
      {results.map((company) => (
        <Card key={company.id} className="bg-white/80 backdrop-blur-md">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">{company.raison_sociale}</h3>
              <p className="text-sm text-gray-500">{company.secteur_activite || 'Secteur non défini'}</p>
            </div>
            <Button 
                variant={company.isFollowing ? "outline" : "default"} 
                size="sm"
                onClick={() => handleFollowToggle(company.id, company.isFollowing)}
            >
              {company.isFollowing ? (
                <><Check className="h-4 w-4 mr-2" />Suivi</>
              ) : (
                <><Plus className="h-4 w-4 mr-2" />Suivre</>
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}