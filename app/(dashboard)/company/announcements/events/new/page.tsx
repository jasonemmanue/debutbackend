// /app/(dashboard)/company/announcements/events/new/page.tsx
"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ChevronLeft, Plus, MapPin, Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function CreateEventPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    lieu: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        const response = await fetch('/api/company/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "La création de l'événement a échoué.");
        }
        
        // Redirection vers la liste des événements de l'entreprise après succès
        router.push('/company/announcements/events');
        router.refresh(); // Rafraîchit les données pour la page de destination

    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-6 sm:p-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ChevronLeft className="h-5 w-5" />
          Retour
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">Créer un nouvel événement</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Calendar className="h-6 w-6 mr-2 text-rose-500" /><span>Détails de l'événement</span></CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="titre">Titre de l'événement *</Label>
              <Input id="titre" name="titre" value={formData.titre} onChange={handleChange} required placeholder="Ex: Forum des métiers du numérique" />
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4} placeholder="Décrivez en détail votre événement..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date_debut">Date et heure de début *</Label>
                <Input type="datetime-local" id="date_debut" name="date_debut" value={formData.date_debut} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="date_fin">Date et heure de fin *</Label>
                <Input type="datetime-local" id="date_fin" name="date_fin" value={formData.date_fin} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <Label htmlFor="lieu">Lieu de l'événement *</Label>
              <Input type="text" id="lieu" name="lieu" value={formData.lieu} onChange={handleChange} required placeholder="Adresse ou lien en ligne" />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600">
                {isLoading ? <Loader2 className="animate-spin" /> : <Plus className="h-5 w-5 mr-2" />}
                Créer l'événement
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}