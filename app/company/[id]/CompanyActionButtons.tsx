'use client'

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, UserCheck, Share2, Loader2, Globe } from "lucide-react";
import { useState, useEffect } from "react";

interface CompanyActionButtonsProps {
  companyId: string;
  websiteUrl: string | null;
}

// Fonction pour s'assurer que l'URL a le bon protocole
const normalizeUrl = (url: string | null): string => {
  if (!url) return '#';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

export function CompanyActionButtons({ companyId, websiteUrl }: CompanyActionButtonsProps) {
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsFollowing(false); 
    setIsLoading(false);
  }, [companyId]);
  
  const handleFollow = () => {
    setIsLoading(true);
    setTimeout(() => {
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
      <Button onClick={handleFollow} variant={isFollowing ? 'secondary' : 'default'} disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin mr-2" /> : isFollowing ? <UserCheck className="h-4 w-4 mr-2"/> : <UserPlus className="h-4 w-4 mr-2"/>}
        {isFollowing ? 'Suivi' : 'Suivre'}
      </Button>
      
      {websiteUrl && (
        <a href={normalizeUrl(websiteUrl)} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700">
                <Globe className="h-4 w-4 mr-2"/>
                Consulter notre site
            </Button>
        </a>
      )}

      <Button variant="outline"><Share2 className="h-4 w-4 mr-2"/> Partager</Button>
    </div>
  )
}
