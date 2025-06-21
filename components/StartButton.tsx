"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StartButton() {
  const { data: session, status } = useSession();

  // Déterminer la destination en fonction du statut et du rôle
  const getHref = () => {
    if (status === "loading") return "#"; // Ne rien faire pendant le chargement
    if (status === "authenticated") {
      const userType = session.user?.type;
      if (userType === 'entreprise' || userType === 'employe') {
        return "/dashboard/company";
      }
      return "/dashboard/client/profile"; // Pour particulier, stagiaire, partenaire
    }
    return "/auth/login"; // Si non connecté, rediriger vers la page de connexion
  };

  return (
    <Link href={getHref()} passHref>
      <Button
        size="lg"
        className="bg-white text-rose-600 hover:bg-rose-50 font-semibold text-lg px-8 py-6 shadow-xl transform hover:scale-105 transition-all duration-300"
        disabled={status === "loading"}
      >
        {status === "authenticated" ? "Accéder à mon espace" : "Commencer maintenant"}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  );
}