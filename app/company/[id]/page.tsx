// /app/company/[id]/page.tsx
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2, MapPin, Phone, Mail, Globe, Star, Calendar, MessageCircle, 
  Share2, Briefcase, Handshake, CheckCircle, Award
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CompanyActionButtons } from './CompanyActionButtons'; // Importer le composant client

// Cette interface définit la structure de nos données
interface CompanyData {
  id: string;
  user: { name: string | null };
  siret: string | null;
  secteur_activite: string | null;
  adresse: string | null;
  telephone: string | null;
  // Simulé pour l'exemple, à ajouter au schéma si nécessaire
  tagline: string;
  description: string;
  logo: string;
  coverImage: string;
  website: string;
  verified: boolean;
}

// La fonction est maintenant asynchrone pour permettre la récupération de données
export default async function CompanyProfilePage({ params }: { params: { id: string } }) {
  
  // Récupération des données réelles de l'entreprise depuis la base de données
  const company = await prisma.entreprise.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: { // Inclure les données de l'utilisateur lié pour avoir le nom
        select: {
          name: true,
        }
      }
    }
  });

  // Si aucune entreprise n'est trouvée, afficher une page 404
  if (!company || !company.user) {
    notFound();
  }

  // Enrichissement des données avec des valeurs par défaut pour l'affichage
  const companyProfile: CompanyData = {
    id: company.id,
    user: { name: company.user.name || "Nom non défini" },
    siret: company.siret,
    secteur_activite: company.secteur_activite || "Non spécifié",
    adresse: company.adresse || "Non spécifiée",
    telephone: company.telephone,
    // Les champs suivants sont simulés pour l'esthétique. Vous devriez les ajouter à votre modèle `Entreprise` dans schema.prisma.
    tagline: `Leader en ${company.secteur_activite || 'solutions innovantes'}.`,
    description: `Depuis notre création, ${company.user.name} se consacre à fournir l'excellence dans le secteur de ${company.secteur_activite}. Notre engagement envers la qualité et la satisfaction client est notre priorité.`,
    logo: "https://placehold.co/120x120/E9D5FF/3730A3?text=" + (company.user.name?.substring(0, 2).toUpperCase() || "C"),
    coverImage: "https://images.unsplash.com/photo-1556761175-5b46a572b786?w=1200&q=80",
    website: `www.${company.user.name?.toLowerCase().replace(/\s/g, '')}.com`,
    verified: true
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-64 md:h-80 relative overflow-hidden">
          <Image src={companyProfile.coverImage} alt={`${companyProfile.user.name} cover`} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="relative -mt-20 z-10">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                  {/* MODIFICATION : Le cadre de l'image a été enlevé */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-xl">
                    <Image src={companyProfile.logo} alt={companyProfile.user.name || "Logo"} fill className="object-cover" />
                    {companyProfile.verified && (
                      <div className="absolute top-1 right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-2xl md:text-4xl font-bold text-gray-800">{companyProfile.user.name}</h1>
                      <Badge className="bg-rose-100 text-rose-700">{companyProfile.secteur_activite}</Badge>
                    </div>
                    <p className="text-lg text-gray-600 mb-4">{companyProfile.tagline}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{companyProfile.adresse}</div>
                      <a href={companyProfile.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-rose-600">
                        <Globe className="h-4 w-4 mr-1" />{companyProfile.website}
                      </a>
                    </div>
                  </div>

                  {/* On utilise notre composant client pour les boutons interactifs */}
                  <CompanyActionButtons companyId={companyProfile.id} />
                  
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section des actions de l'abonné */}
      <section className="container mx-auto px-6 py-12">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-light text-gray-800">Interagir avec {companyProfile.user.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href={`/company/${companyProfile.id}/internships`} passHref>
                    <div className="p-6 border rounded-lg hover:shadow-lg hover:border-rose-300 transition-all text-center group cursor-pointer">
                        <Briefcase className="h-8 w-8 mx-auto text-gray-400 group-hover:text-rose-500 transition-colors"/>
                        <h3 className="mt-4 font-semibold text-lg text-gray-700">Offres de Stage</h3>
                    </div>
                </Link>
                <Link href={`/company/${companyProfile.id}/services`} passHref>
                    <div className="p-6 border rounded-lg hover:shadow-lg hover:border-blue-300 transition-all text-center group cursor-pointer">
                        <Handshake className="h-8 w-8 mx-auto text-gray-400 group-hover:text-blue-500 transition-colors"/>
                        <h3 className="mt-4 font-semibold text-lg text-gray-700">Nos Prestations</h3>
                    </div>
                </Link>
                <Link href={`/company/${companyProfile.id}/events`} passHref>
                    <div className="p-6 border rounded-lg hover:shadow-lg hover:border-green-300 transition-all text-center group cursor-pointer">
                        <Calendar className="h-8 w-8 mx-auto text-gray-400 group-hover:text-green-500 transition-colors"/>
                        <h3 className="mt-4 font-semibold text-lg text-gray-700">Événements</h3>
                    </div>
                </Link>
                 <Link href={`/company/${companyProfile.id}/announcements`} passHref>
                    <div className="p-6 border rounded-lg hover:shadow-lg hover:border-purple-300 transition-all text-center group cursor-pointer">
                        <Star className="h-8 w-8 mx-auto text-gray-400 group-hover:text-purple-500 transition-colors"/>
                        <h3 className="mt-4 font-semibold text-lg text-gray-700">Annonces</h3>
                    </div>
                </Link>
            </CardContent>
        </Card>
      </section>

      {/* Section À Propos et Contact */}
       <section className="container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader><CardTitle>À propos de {companyProfile.user.name}</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-gray-600 leading-relaxed">{companyProfile.description}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                 <Card>
                    <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {companyProfile.telephone && <p className="flex items-center"><Phone className="h-4 w-4 mr-2"/> {companyProfile.telephone}</p>}
                        <p className="flex items-center"><Mail className="h-4 w-4 mr-2"/> contact@{companyProfile.id}.com</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>
    </div>
  )
}