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

export default function CompleteProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [userType, setUserType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Données du formulaire pour l'entreprise
  const [raisonSociale, setRaisonSociale] = useState('');
  const [siret, setSiret] = useState('');
  const [secteur, setSecteur] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Validation des champs
    if (!userType) {
        setError("Veuillez choisir un type de profil.");
        setIsLoading(false);
        return;
    }
    if (userType === 'entreprise' && (!raisonSociale || !siret)) {
        setError("La raison sociale et le SIRET sont obligatoires pour une entreprise.");
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch('/api/users/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: userType,
          ...(userType === 'entreprise' && { raison_sociale: raisonSociale, siret, secteur_activite: secteur, telephone }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue lors de la mise à jour du profil.');
      }
      
      // Met à jour la session côté client pour refléter le nouveau rôle
      await update({ type: userType });

      // Redirige l'utilisateur vers son dashboard approprié
      router.push(userType === 'entreprise' ? '/company' : '/client/profile');
      router.refresh(); // Force un rafraîchissement pour charger la bonne page

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
          <p className="text-center text-gray-600">Bienvenue, {session?.user?.name} ! Aidez-nous à personnaliser votre expérience.</p>
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
                  <SelectItem value="particulier">Particulier</SelectItem>
                  <SelectItem value="stagiaire">Stagiaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {userType === 'entreprise' && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50 animate-in fade-in-50">
                 <h3 className="font-semibold text-gray-700">Informations sur l'entreprise</h3>
                 <div className="space-y-1">
                   <Label htmlFor="raisonSociale">Raison Sociale*</Label>
                   <Input id="raisonSociale" value={raisonSociale} onChange={(e) => setRaisonSociale(e.target.value)} required />
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
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button type="submit" disabled={isLoading || !userType} className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white">
              {isLoading ? <Loader2 className="animate-spin" /> : 'Continuer vers mon espace'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}