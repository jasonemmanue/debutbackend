"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export function DynamicStartButton() {
  const { data: session, status } = useSession();

  const getButtonProps = () => {
    if (status === "loading") {
      return {
        href: "#",
        text: "Chargement...",
        disabled: true,
      };
    }
    
    if (status === "authenticated") {
      const userType = session.user?.type;
      const isCompany = userType === 'entreprise' || userType === 'employe';
      return {
        href: isCompany ? "/dashboard/company" : "/dashboard/client/profile",
        text: "Accéder à mon espace",
        disabled: false,
      };
    }

    // Si l'utilisateur n'est pas connecté, le bouton mène à l'inscription.
    return {
      href: "/auth/register",
      text: "Commencer maintenant",
      disabled: false,
    };
  };

  const { href, text, disabled } = getButtonProps();

  return (
    <Link href={href} passHref>
      <Button
        size="lg"
        className="bg-white text-rose-600 hover:bg-rose-50 font-semibold text-lg px-8 py-6"
        disabled={disabled}
      >
        {status === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {text}
      </Button>
    </Link>
  );
}