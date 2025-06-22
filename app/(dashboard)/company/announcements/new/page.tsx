// app/(dashboard)/company/announcements/new/page.tsx
"use client"

import React, { useState } from 'react' // 
import { Button } from "@/components/ui/button" // 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // 
import { Badge } from "@/components/ui/badge" // 
import { ChevronLeft, Plus, FileText, Briefcase, Calendar, Clock, MapPin, DollarSign, X, Check } from "lucide-react" // 
import { Textarea } from "@/components/ui/textarea" // 
import { Input } from "@/components/ui/input" // 
import { Label } from "@/components/ui/label" // 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // 
import { Switch } from "@/components/ui/switch" // 
import { useRouter } from 'next/navigation'

export default function PublishAnnouncementPage() {
  const router = useRouter(); // Utiliser le routeur de Next.js pour la navigation

  const [formData, setFormData] = useState({ // 
    titre_annonce: "",
    type_annonce: "emploi",
    contenu_annonce: "",
    date_expiration: "",
    localisation: "",
    salaire: "",
    salaire_visible: false,
    competences_requises: "",
    statut: "draft"
  })

  const announcementTypes = [ // 
    { value: "emploi", label: "Offre d'emploi" },
    { value: "stage", label: "Stage" },
    { value: "alternance", label: "Alternance" },
    { value: "evenement", label: "Événement" },
    { value: "information", label: "Information" }
  ]

  const handleSubmit = (e: React.FormEvent) => { // 
    e.preventDefault()
    console.log("Annonce à publier:", formData)
    // Ici, vous ajouteriez la logique d'appel à une API pour sauvegarder l'annonce
    // Après succès, rediriger vers la liste des annonces
    router.push('/company/announcements');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-6 sm:p-8">
        <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => router.back()} className="mr-4">
                <ChevronLeft className="h-5 w-5" /> Retour
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">Publier une Annonce</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
                <CardHeader><CardTitle>Détails de l'Annonce</CardTitle></CardHeader>
                <CardContent className="p-6 space-y-6">
                     <div className="space-y-2">
                      <Label htmlFor="type">Type d'annonce *</Label>
                      <Select value={formData.type_annonce} onValueChange={(value) => setFormData({...formData, type_annonce: value})}>
                        <SelectTrigger><SelectValue placeholder="Sélectionnez un type" /></SelectTrigger>
                        <SelectContent>
                          {announcementTypes.map((type) => ( <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem> ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre de l'annonce *</Label>
                      <Input id="title" value={formData.titre_annonce} onChange={(e) => setFormData({...formData, titre_annonce: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description détaillée *</Label>
                      <Textarea id="description" value={formData.contenu_annonce} onChange={(e) => setFormData({...formData, contenu_annonce: e.target.value})} rows={6} required />
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => router.back()}>Annuler</Button>
                <Button type="submit"><Check className="h-4 w-4 mr-2" />Publier l'annonce</Button>
            </div>
        </form>
    </div>
  )
}