"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  ChevronDown, 
  Star, 
  Users 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AuthButtons } from "./AuthButtons";

export function Header() {
  const pathname = usePathname();

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
              <p className="text-xs text-rose-500/70 font-medium">RÉSEAU D'EXCELLENCE</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {pathname !== '/' && (
              <Button asChild variant="ghost">
                <Link href="/" className="text-gray-600 hover:text-rose-600 transition-colors duration-300 font-medium">
                  Accueil
                </Link>
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 hover:text-rose-600 transition-colors duration-300 font-medium">
                  <span>Entreprises</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-4 space-y-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-rose-100">
                  <DropdownMenuItem asChild>
                    <Link href="/compagnies/categories" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-rose-50 transition-colors group/item cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 group-hover/item:text-rose-600">Catégories</h4>
                          <p className="text-xs text-gray-500">Parcourir par secteur</p>
                        </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/compagnies/top" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-rose-50 transition-colors group/item cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-rose-500 rounded-lg flex items-center justify-center">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 group-hover/item:text-rose-600">Top Entreprises</h4>
                          <p className="text-xs text-gray-500">Classement des meilleures</p>
                        </div>
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/compagnies/partenership" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-rose-50 transition-colors group/item cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 group-hover/item:text-rose-600">Partenariats</h4>
                          <p className="text-xs text-gray-500">Demande de collaboration</p>
                        </div>
                    </Link>
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild variant="ghost">
              <Link href="/news" className="text-gray-600 hover:text-rose-600 transition-colors duration-300 font-medium">
                Actualités
              </Link>
            </Button>

            <Button asChild variant="ghost">
               <Link href="/about" className="text-gray-600 hover:text-rose-600 transition-colors duration-300 font-medium">
                À propos
              </Link>
            </Button>
          </nav>
          
          <div className="flex items-center">
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
}
