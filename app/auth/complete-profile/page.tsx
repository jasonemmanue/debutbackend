"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, User, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CompleteProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [userType, setUserType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form data
  const [raisonSociale, setRaisonSociale] = useState('');
  const [siret, setSiret] = useState('');
  const [secteur, setSecteur] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Validation
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
          // Inclure les données spécifiques au type
          ...(userType === 'entreprise' && { raison_sociale: raisonSociale, siret, secteur_activite: secteur, telephone }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue.');
      }
      
      // Mettre à jour la session côté client pour refléter le nouveau type
      await update({ type: userType });

      // Redirection vers le dashboard approprié
      router.push(userType === 'entreprise' ? '/dashboard/company' : '/dashboard/client/profile');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
              <label className="text-sm font-medium">Je suis un(e)...</label>
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
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                 <h3 className="font-semibold">Informations sur l'entreprise</h3>
                 <div>
                   <label>Raison Sociale*</label>
                   <input value={raisonSociale} onChange={(e) => setRaisonSociale(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md" />
                 </div>
                 <div>
                   <label>SIRET*</label>
                   <input value={siret} onChange={(e) => setSiret(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md" />
                 </div>
                 <div>
                   <label>Secteur d'activité</label>
                   <input value={secteur} onChange={(e) => setSecteur(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md" />
                 </div>
                 <div>
                   <label>Téléphone</label>
                   <input value={telephone} onChange={(e) => setTelephone(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md" />
                 </div>
              </div>
            )}
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" disabled={isLoading || !userType} className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white">
              {isLoading ? <Loader2 className="animate-spin" /> : 'Continuer vers mon espace'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}