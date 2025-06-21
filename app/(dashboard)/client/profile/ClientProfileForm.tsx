// /app/(dashboard)/client/profile/ClientProfileForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, Upload } from "lucide-react";
import Image from "next/image";

// Reprendre la même interface que dans la page serveur
interface ProfileData {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  type: string | null;
  details: any; // Simplifié pour l'exemple
}

export function ClientProfileForm({ profile }: { profile: ProfileData }) {
  const { update } = useSession();
  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [image, setImage] = useState<string | null>(profile.image);
  const [isLoading, setIsLoading] = useState(false);
  // Ajoutez d'autres états pour les champs spécifiques (intérêts, études...)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implémenter la logique de mise à jour du profil via une API
    console.log("Mise à jour du profil:", { name });
    await new Promise(resolve => setTimeout(resolve, 1500));
    await update({ name, image }); // Mettre à jour la session
    setIsLoading(false);
    alert("Profil mis à jour !");
  };

  return (
    <div className="container mx-auto py-12 px-6 bg-gray-50 min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Mon Profil ({profile.type})</h1>
        <p className="text-lg text-gray-600">Gérez vos informations personnelles et votre compte.</p>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                {/* ... Photo de profil ... */}
            </div>
            <div className="md:col-span-2">
                <Card>
                    <CardHeader><CardTitle>Informations Personnelles</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom complet</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Adresse Email</Label>
                            <Input id="email" type="email" value={email} disabled />
                        </div>
                        {/* Afficher les champs spécifiques en fonction du type */}
                        {profile.type === 'stagiaire' && (
                            <div className="space-y-2">
                                <Label>Domaine d'études</Label>
                                <Input defaultValue={profile.details?.domaine_etudes || ''} />
                            </div>
                        )}
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                                {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                                Enregistrer
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </form>
    </div>
  );
}