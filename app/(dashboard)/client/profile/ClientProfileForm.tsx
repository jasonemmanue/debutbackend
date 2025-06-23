// /app/(dashboard)/client/profile/ClientProfileForm.tsx
"use client";

import { useState } from 'react';
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Textarea } from '@/components/ui/textarea';

// Interface pour les données du profil
interface ProfileData {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  type: string | null;
  details: any; 
}

export function ClientProfileForm({ profile }: { profile: ProfileData }) {
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  
  // [MODIFIÉ] États pour tous les champs du formulaire
  const [name, setName] = useState(profile.name || '');
  const [niveauEtudes, setNiveauEtudes] = useState(profile.details?.niveau_etudes || '');
  const [domaineEtudes, setDomaineEtudes] = useState(profile.details?.domaine_etudes || '');
  const [competences, setCompetences] = useState(profile.details?.competences || '');

  // [MODIFIÉ] Logique de soumission complète
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Mettre à jour les détails du profil stagiaire via notre nouvelle API
      if (profile.type === 'stagiaire') {
        const response = await fetch('/api/client/profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            niveau_etudes: niveauEtudes,
            domaine_etudes: domaineEtudes,
            competences: competences,
          }),
        });

        if (!response.ok) {
          throw new Error('La mise à jour du profil a échoué.');
        }
      }
      
      // 2. Mettre à jour les informations générales de la session (nom)
      await update({ name });
      
      alert("Profil mis à jour avec succès !");

    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de la mise à jour.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-6 bg-gray-50 min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Mon Profil ({profile.type})</h1>
        <p className="text-lg text-gray-600">Gérez vos informations personnelles et votre compte.</p>
      </header>
      <form onSubmit={handleSubmit}>
        <Card>
            <CardHeader><CardTitle>Informations Personnelles</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Adresse Email</Label>
                    <Input id="email" type="email" value={profile.email || ''} disabled />
                </div>

                {/* [MODIFIÉ] Affichage de tous les champs pour le stagiaire */}
                {profile.type === 'stagiaire' && (
                    <>
                      <div className="space-y-2">
                          <Label htmlFor="niveauEtudes">Niveau d'études</Label>
                          <Input id="niveauEtudes" value={niveauEtudes} onChange={(e) => setNiveauEtudes(e.target.value)} placeholder="Ex: Bac+5, Master 2..." />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="domaineEtudes">Domaine d'études</Label>
                          <Input id="domaineEtudes" value={domaineEtudes} onChange={(e) => setDomaineEtudes(e.target.value)} placeholder="Ex: Informatique, Marketing Digital..." />
                      </div>
                       <div className="space-y-2">
                          <Label htmlFor="competences">Compétences</Label>
                          <Textarea id="competences" value={competences} onChange={(e) => setCompetences(e.target.value)} placeholder="Ex: React, Node.js, Photoshop, Gestion de projet..." />
                      </div>
                    </>
                )}
                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                        {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                        Enregistrer les modifications
                    </Button>
                </div>
            </CardContent>
        </Card>
      </form>
    </div>
  );
}