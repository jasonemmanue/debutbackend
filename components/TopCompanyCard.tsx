// /components/TopCompanyCard.tsx
"use client"; // Rendre le composant interactif

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react'; // Importer useState pour gérer l'état

// Définition de l'interface pour les données de l'entreprise
interface CompanyData {
  id: string;
  name: string;
  logo: string;
  sector: string;
}

// Définition de l'interface pour les props du composant
interface TopCompanyCardProps {
  company: CompanyData;
}

export const TopCompanyCard: React.FC<TopCompanyCardProps> = ({ company }) => {
  // État pour gérer la source de l'image. Initialisé avec le logo de l'entreprise.
  const [imgSrc, setImgSrc] = useState(company.logo);

  // URL de secours générée avec ui-avatars.com, utilisant la première lettre du nom de l'entreprise.
  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name.charAt(0))}&background=E0E7FF&color=3730A3&bold=true`;

  // Fonction appelée si le chargement de l'image principale échoue
  const handleImageError = () => {
    // En cas d'erreur, on met à jour l'état pour utiliser l'URL de secours
    setImgSrc(fallbackSrc);
  };
  
  return (
    // L'ensemble de la carte est un lien vers le profil de l'entreprise
    <Link href={`/company/${company.id}`} passHref>
      <Card className="group h-full flex flex-col items-center text-center p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-rose-100 hover:border-rose-300 cursor-pointer">
        <CardContent className="p-0 flex flex-col items-center justify-center">
          {/* Conteneur pour le logo avec un effet visuel */}
          <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden shadow-lg border-2 border-white group-hover:border-rose-200 transition-colors">
            <Image
              src={imgSrc} // Utilise la source de l'image de l'état
              alt={`Logo de ${company.name}`}
              fill // Remplit le conteneur parent
              className="object-cover" // S'assure que l'image couvre bien l'espace sans se déformer
              onError={handleImageError} // [IMPORTANT] Appelle cette fonction si l'image ne se charge pas
            />
          </div>
          <h3 className="font-bold text-gray-800 text-lg leading-tight">{company.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{company.sector}</p>
        </CardContent>
      </Card>
    </Link>
  );
};