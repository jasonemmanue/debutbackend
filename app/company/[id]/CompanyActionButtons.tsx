// /app/company/[id]/CompanyActionButtons.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";

interface CompanyActionButtonsProps {
  companyId: string;
}

export function CompanyActionButtons({ companyId }: CompanyActionButtonsProps) {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si l'utilisateur suit déjà cette entreprise
  useEffect(() => {
    if (!session?.user) {
      setIsLoading(false);
      return;
    }

    const checkFollowStatus = async () => {
      // Dans une application réelle, on pourrait avoir un endpoint GET /api/follow/status?entrepriseId=...
      // Pour la démo, on simule en se basant sur une recherche qui nous retourne le statut
      // Ici, on suppose "false" par défaut et laissons l'utilisateur cliquer.
      setIsLoading(false);
    };

    checkFollowStatus();
  }, [session, companyId]);

  const handleFollowToggle = async () => {
    const originalFollowStatus = isFollowing;
    setIsFollowing(!isFollowing); // Mise à jour optimiste

    try {
      const response = await fetch('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entrepriseId: companyId,
          action: originalFollowStatus ? 'unfollow' : 'follow'
        })
      });
      if (!response.ok) throw new Error("La requête a échoué");
    } catch (error) {
      setIsFollowing(originalFollowStatus); // Rollback
      console.error("Erreur lors du suivi/non-suivi", error);
    }
  };

  if (!session) {
    return null; // Ne pas afficher les boutons si l'utilisateur n'est pas connecté
  }

  if (isLoading) {
    return <div className="h-24 w-full md:w-auto animate-pulse bg-gray-200 rounded-md"></div>;
  }

  return (
    <div className="flex flex-col space-y-3 w-full md:w-auto">
      <Button onClick={handleFollowToggle} variant={isFollowing ? "outline" : "default"} className="w-full">
        {isFollowing ? 
          <><CheckCircle className="h-4 w-4 mr-2" />Suivi</> : 
          <><Heart className="h-4 w-4 mr-2" />Suivre</>
        }
      </Button>
      <Button variant="outline" className="w-full">
        <MessageCircle className="h-4 w-4 mr-2" />Contacter
      </Button>
    </div>
  );
}