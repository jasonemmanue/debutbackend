// /app/auth/complete-profile/page.tsx

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CompleteProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [userType, setUserType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Champs pour l'entreprise avec les deux noms distincts
  const [nomEntreprise, setNomEntreprise] = useState('');
  const [raisonSociale, setRaisonSociale] = useState('');
  const [siret, setSiret] = useState('');
  const [secteur, setSecteur] = useState('');
  const [telephone, setTelephone] = useState('');
  
  // Champs pour l'employé
  const [poste, setPoste] = useState('');
  const [competences, setCompetences] = useState('');
  const [siretEntreprise, setSiretEntreprise] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (!userType) {
        setError("Veuillez choisir un type de profil.");
        setIsLoading(false);
        return;
    }
    if (userType === 'entreprise' && (!nomEntreprise || !raisonSociale || !siret)) {
        setError("Le nom de l'entreprise, la raison sociale et le SIRET sont obligatoires.");
        setIsLoading(false);
        return;
    }
    if (userType === 'employe' && (!poste || !competences || !siretEntreprise)) {
        setError("Le poste, les compétences et le SIRET de l'entreprise sont obligatoires.");
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch('/api/users/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: userType,
          ...(userType === 'entreprise' && { 
            nom_entreprise: nomEntreprise, // Le nom public
            raison_sociale: raisonSociale, // Le nom légal
            siret, 
            secteur_activite: secteur, 
            telephone 
          }),
          ...(userType === 'employe' && { poste, siret_entreprise: siretEntreprise, competences }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue.');
      }
      
      // On met à jour la session avec le nom public de l'entreprise si c'est le cas
      const sessionUpdateData: { type: string; name?: string } = { type: userType };
      if (userType === 'entreprise') {
          sessionUpdateData.name = nomEntreprise;
      }
      await update(sessionUpdateData);

      const isCompanyContext = userType === 'entreprise' || userType === 'employe';
      if (isCompanyContext) {
        router.push('/company');
      } else {
        router.push('/client/profile');
      }
      router.refresh();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-light">Finalisez votre inscription</CardTitle>
          <p className="text-center text-gray-600">Bienvenue ! Aidez-nous à personnaliser votre expérience.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Je suis un(e)...</Label>
              <Select onValueChange={setUserType} value={userType}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Sélectionnez votre type de profil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entreprise">Entreprise</SelectItem>
                  <SelectItem value="employe">Employé(e)</SelectItem> 
                  <SelectItem value="particulier">Particulier</SelectItem>
                  <SelectItem value="stagiaire">Stagiaire</SelectItem>
                  <SelectItem value="partenaire">Partenaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {userType === 'entreprise' && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50 animate-in fade-in-50">
                 <h3 className="font-semibold text-gray-700">Informations sur l'entreprise</h3>
                 
                 <div className="space-y-1">
                   <Label htmlFor="nomEntreprise">Nom de l'entreprise (public)*</Label>
                   <Input id="nomEntreprise" value={nomEntreprise} onChange={(e) => setNomEntreprise(e.target.value)} required placeholder="Le nom affiché partout"/>
                 </div>
                 
                 <div className="space-y-1">
                   <Label htmlFor="raisonSociale">Raison Sociale (légale)*</Label>
                   <Input id="raisonSociale" value={raisonSociale} onChange={(e) => setRaisonSociale(e.target.value)} required placeholder="Le nom légal de l'entité"/>
                 </div>
                 
                 <div className="space-y-1">
                   <Label htmlFor="siret">SIRET*</Label>
                   <Input id="siret" value={siret} onChange={(e) => setSiret(e.target.value)} required />
                 </div>
                 <div className="space-y-1">
                   <Label htmlFor="secteur">Secteur d'activité</Label>
                   <Input id="secteur" value={secteur} onChange={(e) => setSecteur(e.target.value)} />
                 </div>
                 <div className="space-y-1">
                   <Label htmlFor="telephone">Téléphone</Label>
                   <Input id="telephone" type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                 </div>
              </div>
            )}

            {userType === 'employe' && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50 animate-in fade-in-50">
                 <h3 className="font-semibold text-gray-700">Informations sur l'employé(e)</h3>
                 <div className="space-y-1">
                   <Label htmlFor="siretEntreprise">SIRET de votre entreprise*</Label>
                   <Input id="siretEntreprise" value={siretEntreprise} onChange={(e) => setSiretEntreprise(e.target.value)} required placeholder="Pour vous rattacher à votre entreprise"/>
                 </div>
                 <div className="space-y-1">
                   <Label htmlFor="poste">Votre poste*</Label>
                   <Input id="poste" value={poste} onChange={(e) => setPoste(e.target.value)} required />
                 </div>
                 <div className="space-y-1">
                   <Label htmlFor="competences">Vos compétences*</Label>
                   <Textarea id="competences" value={competences} onChange={(e) => setCompetences(e.target.value)} required placeholder="Ex: Gestion de projet, Marketing, Vente..."/>
                 </div>
              </div>
            )}
            
            {error && <p className="text-red-500 text-sm text-center font-semibold">{error}</p>}

            <Button type="submit" disabled={isLoading || !userType} className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white">
              {isLoading ? <Loader2 className="animate-spin" /> : 'Continuer vers mon espace'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}