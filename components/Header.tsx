"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import { AuthButtons } from "./AuthButtons"; // Importation du nouveau composant

export function Header() {
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
          
          {/* On utilise notre nouveau composant ici */}
          <AuthButtons />

        </div>
      </div>
    </header>
  );
}