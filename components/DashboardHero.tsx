"use client";

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';

interface DashboardHeroProps {
  title: React.ReactNode;
  subtitle: string;
  showSearchBar?: boolean;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export function DashboardHero({ title, subtitle, showSearchBar = false, searchQuery, setSearchQuery }: DashboardHeroProps) {
  const [currentBgSlide, setCurrentBgSlide] = useState(0);

  const backgroundImages = [
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop",
  ];

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(bgTimer);
  }, [backgroundImages.length]);

  return (
    <section className="relative py-20 px-6 overflow-hidden mt-16">
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBgSlide ? "opacity-100" : "opacity-0"}`}>
            <img src={image} alt={`Background slide ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/70 via-purple-900/50 to-rose-900/70 z-10"></div>
      </div>
      <div className="relative z-20 container mx-auto text-center text-white">
        <h2 className="text-5xl md:text-7xl font-light mb-6 leading-tight drop-shadow-2xl">
          {title}
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto font-light drop-shadow-lg">
          {subtitle}
        </p>
        {showSearchBar && setSearchQuery && (
           <div className="max-w-2xl mx-auto">
             <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl">
               <div className="flex items-center">
                 <Search className="ml-4 h-5 w-5 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="Rechercher une entreprise..." 
                   className="flex-1 ml-3 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none py-3"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
                 <Button className="bg-gradient-to-r from-rose-500 to-purple-500 text-white px-6 hover:from-rose-600 hover:to-purple-600">Rechercher</Button>
               </div>
             </div>
           </div>
        )}
      </div>
    </section>
  );
}