'use client'

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, UserCheck, Share2, Loader2, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link"; // Gardé pour une utilisation future potentielle

// Interface pour définir les props du composant
interface CompanyActionButtonsProps {
  companyId: string;
  websiteUrl: string | null; // Peut être null si l'entreprise n'a pas de site
}

// [NOUVEAU] Fonction pour s'assurer que l'URL a le bon protocole
const normalizeUrl = (url: string | null): string => {
  if (!url) return '#'; // Retourne un lien non fonctionnel si l'URL est nulle
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url; // L'URL est déjà correcte
  }
  // Ajoute https:// si aucun protocole n'est présent
  return `https://${url}`;
};

export function CompanyActionButtons({ companyId, websiteUrl }: CompanyActionButtonsProps) {
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simule la vérification du statut "suivi" au chargement du composant
  useEffect(() => {
    // Dans une vraie application, vous feriez un appel API ici
    // pour vérifier si l'utilisateur connecté suit déjà cette entreprise.
    setIsFollowing(false); 
    setIsLoading(false);
  }, [companyId]);
  
  // Gère la logique de suivi / non-suivi
  const handleFollow = () => {
    setIsLoading(true);
    // Ici, vous feriez un appel API pour mettre à jour la BDD
    setTimeout(() => { // Simule le délai de l'appel API
        setIsFollowing(!isFollowing);
        setIsLoading(false);
        toast({ 
            title: isFollowing ? "Vous ne suivez plus cette entreprise." : "Vous suivez maintenant cette entreprise !",
            description: "Vos préférences ont été mises à jour.",
        });
    }, 500);
  }

  return (
    <div className="flex items-center space-x-2 flex-wrap gap-2">
      {/* Bouton pour suivre l'entreprise */}
      <Button onClick={handleFollow} variant={isFollowing ? 'secondary' : 'default'} disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin mr-2" /> : isFollowing ? <UserCheck className="h-4 w-4 mr-2"/> : <UserPlus className="h-4 w-4 mr-2"/>}
        {isFollowing ? 'Suivi' : 'Suivre'}
      </Button>
      
      {/* Bouton pour consulter le site web, s'affiche conditionnellement */}
      {websiteUrl && (
        // [CORRIGÉ] Utilisation de la fonction normalizeUrl pour créer le href
        <a href={normalizeUrl(websiteUrl)} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700">
                <Globe className="h-4 w-4 mr-2"/>
                Consulter notre site
            </Button>
        </a>
      )}

      {/* Bouton pour partager */}
      <Button variant="outline"><Share2 className="h-4 w-4 mr-2"/> Partager</Button>
    </div>
  )
}