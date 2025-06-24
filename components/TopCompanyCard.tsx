// /components/TopCompanyCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

interface CompanyData {
  id: string;
  name: string;
  logo: string;
  sector: string;
}

interface TopCompanyCardProps {
  company: CompanyData;
}

export const TopCompanyCard: React.FC<TopCompanyCardProps> = ({ company }) => {
  const [imgSrc, setImgSrc] = useState(company.logo);
  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name.charAt(0))}&background=E0E7FF&color=3730A3&bold=true`;

  const handleImageError = () => {
    setImgSrc(fallbackSrc);
  };
  
  return (
    <Link href={`/company/${company.id}`} passHref>
      <Card className="group h-full flex flex-col items-center text-center p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-rose-100 hover:border-rose-300 cursor-pointer">
        <CardContent className="p-0 flex flex-col items-center justify-center">
          <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden shadow-lg border-2 border-white group-hover:border-rose-200 transition-colors">
            <Image
              src={imgSrc}
              alt={`Logo de ${company.name}`}
              fill
              className="object-cover"
              onError={handleImageError}
            />
          </div>
          <h3 className="font-bold text-gray-800 text-lg leading-tight">{company.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{company.sector}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
