"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, Upload } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientProfilePage() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
      setImage(session.user.image || null);
    }
  }, [session]);

  if (status === "loading") {
      return (
          <div className="container mx-auto py-12 px-6">
              <Skeleton className="h-10 w-1/3 mb-8" />
              <div className="grid md:grid-cols-3 gap-6">
                  <Skeleton className="h-64 w-full md:col-span-1" />
                  <Skeleton className="h-64 w-full md:col-span-2" />
              </div>
          </div>
      );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Prévisualisation de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implémenter la logique d'upload de l'image et de mise à jour du profil
    // 1. Uploader `imageFile` vers votre service de stockage (ex: S3, Vercel Blob)
    // 2. Récupérer l'URL de l'image uploadée
    // 3. Appeler une API pour mettre à jour le profil dans la base de données
    console.log("Mise à jour du profil:", { name, email, newImage: imageFile?.name });
    
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mettre à jour la session côté client pour refléter les changements
    await update({ name, image });
    
    setIsLoading(false);
    alert("Profil mis à jour !");
  };

  return (
    <div className="container mx-auto py-12 px-6 bg-gray-50 min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Mon Profil</h1>
        <p className="text-lg text-gray-600">Gérez vos informations personnelles et votre compte.</p>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Colonne de la photo de profil */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Photo de Profil</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="relative w-40 h-40 rounded-full">
                  {image ? (
                    <Image src={image} alt="Avatar" layout="fill" className="rounded-full object-cover"/>
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                      <User className="h-20 w-20 text-white" />
                    </div>
                  )}
                </div>
                <Button asChild variant="outline">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4"/>
                    Changer de photo
                  </label>
                </Button>
                <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*"/>
              </CardContent>
            </Card>
          </div>

          {/* Colonne des informations */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations Personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse Email</Label>
                  <Input id="email" type="email" value={email} disabled />
                  <p className="text-xs text-gray-500">L'email ne peut pas être modifié.</p>
                </div>
                {/* Ajoutez ici d'autres champs de profil (téléphone, adresse, etc.) en fonction du type de client */}
                <div className="flex justify-end">
                   <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                      {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                      Enregistrer les modifications
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