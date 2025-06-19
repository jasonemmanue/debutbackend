"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function AuthButtons() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Outil de débogage ---
  // Surveillez la console de votre navigateur (F12) pour ces messages.
  useEffect(() => {
    if (mounted) {
      console.log("[AuthButtons] Status:", status);
      console.log("[AuthButtons] Session:", session);
    }
  }, [status, session, mounted]);

  // Affiche un placeholder pour éviter les erreurs d'hydratation
  if (!mounted) {
    return (
      <div className="flex items-center space-x-3 h-10">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
      </div>
    );
  }

  // Si l'utilisateur est authentifié, on affiche le menu profil
  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Image
              src={session.user?.image || "/placeholder.svg?text=U"}
              alt={session.user?.name || "User Avatar"}
              fill
              className="rounded-full object-cover"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Mon Profil</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Se déconnecter</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Sinon, on affiche les boutons de connexion
  return (
    <div className="flex items-center space-x-3">
      <Button asChild variant="ghost" className="text-gray-600 hover:text-rose-600">
        <Link href="/auth/login">Se connecter</Link>
      </Button>
      <Button asChild className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white shadow-lg">
        <Link href="/auth/register">S'inscrire</Link>
      </Button>
    </div>
  );
}