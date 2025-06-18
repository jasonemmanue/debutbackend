// Header.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Building2, LogOut, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Importez useState et useEffect de React
import { useState, useEffect } from "react";

export function Header() {
  const { data: session, status } = useSession();

  // Ce composant va maintenant gérer son propre état de montage
  const AuthDisplay = () => {
    const [mounted, setMounted] = useState(false);

    // useEffect s'exécute uniquement sur le client après le premier rendu
    useEffect(() => {
      setMounted(true);
    }, []);

    // Si le composant n'est pas encore monté, on n'affiche rien (ou un placeholder)
    // pour garantir que le rendu serveur et le premier rendu client sont identiques.
    if (!mounted) {
      return (
        <div className="flex items-center space-x-3">
          <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      );
    }

    if (status === "loading" && !session) {
       return (
        <div className="flex items-center space-x-3">
          <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      );
    }
    
    if (session) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Image
                src={session.user?.image || "/placeholder.svg?text=User"}
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
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Se déconnecter</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="flex items-center space-x-3">
        <Button
          asChild
          variant="ghost"
          className="text-gray-600 hover:text-rose-600"
        >
          <Link href="/auth/login">Se connecter</Link>
        </Button>
        <Button
          asChild
          className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white shadow-lg"
        >
          <Link href="/auth/register">S'inscrire</Link>
        </Button>
      </div>
    );
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-rose-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                B2B Connect
              </h1>
              <p className="text-xs text-rose-500/70 font-medium">
                RÉSEAU D'EXCELLENCE
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {["Entreprises", "Services", "Actualités", "À propos"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-600 hover:text-rose-600 transition-colors duration-300 font-medium"
                >
                  {item}
                </Link>
              )
            )}
          </nav>

          <AuthDisplay />
        </div>
      </div>
    </header>
  );
}