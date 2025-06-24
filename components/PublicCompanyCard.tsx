// /components/PublicCompanyCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Globe, MapPin } from "lucide-react";

// Définir le type pour les props du composant
interface Company {
  id: string;
  user: { name: string | null };
  secteur_activite: string | null;
  adresse: string | null;
  ville: string | null;
  pays: string | null;
  site_web: string | null;
}

interface PublicCompanyCardProps {
  company: Company;
}

export const PublicCompanyCard: React.FC<PublicCompanyCardProps> = ({ company }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-rose-500" />
          <span>{company.user.name || "Entreprise"}</span>
        </CardTitle>
        {company.secteur_activite && (
          <Badge variant="secondary" className="w-fit">{company.secteur_activite}</Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-1 shrink-0" />
          <span>{company.adresse || "Adresse non fournie"}</span>
        </div>
        <div className="flex items-start gap-2">
          <Globe className="h-4 w-4 mt-1 shrink-0" />
          {company.site_web ? (
            <a href={`https://${company.site_web}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {company.site_web}
            </a>
          ) : (
            <span>Site web non disponible</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};