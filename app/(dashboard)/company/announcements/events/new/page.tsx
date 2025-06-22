// app/(dashboard)/company/events/new/page.tsx
"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ChevronLeft, Plus, MapPin, Users, Bookmark, Briefcase } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function CreateEventPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    titre_evenement: '',
    description_evenement: '',
    date_debut_evenement: '',
    date_fin_evenement: '',
    lieu_evenement: '',
    capacite_max: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Données de l\'événement:', formData)
    router.push('/company') // Rediriger après la création
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ChevronLeft className="h-5 w-5" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Créer un nouvel événement</h1>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Formulaire principal */}
          <div className="col-span-8">
            <Card className="border-rose-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-rose-500" />
                  <span>Détails de l'événement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="titre_evenement" className="block text-sm font-medium text-gray-700 mb-1">
                      Titre de l'événement *
                    </label>
                    <input
                      type="text"
                      id="titre_evenement"
                      name="titre_evenement"
                      value={formData.titre_evenement}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Ex: Forum des métiers du numérique"
                    />
                  </div>

                  <div>
                    <label htmlFor="description_evenement" className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      id="description_evenement"
                      name="description_evenement"
                      value={formData.description_evenement}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Décrivez en détail votre événement..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date_debut_evenement" className="block text-sm font-medium text-gray-700 mb-1">
                        Date et heure de début *
                      </label>
                      <input
                        type="datetime-local"
                        id="date_debut_evenement"
                        name="date_debut_evenement"
                        value={formData.date_debut_evenement}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="date_fin_evenement" className="block text-sm font-medium text-gray-700 mb-1">
                        Date et heure de fin *
                      </label>
                      <input
                        type="datetime-local"
                        id="date_fin_evenement"
                        name="date_fin_evenement"
                        value={formData.date_fin_evenement}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lieu_evenement" className="block text-sm font-medium text-gray-700 mb-1">
                       Lieu de l'événement *
                    </label>
                    <input
                      type="text"
                      id="lieu_evenement"
                      name="lieu_evenement"
                      value={formData.lieu_evenement}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Adresse ou lien en ligne"
                    />
                  </div>

                  <div>
                    <label htmlFor="capacite_max" className="block text-sm font-medium text-gray-700 mb-1">
                      Capacité maximale (optionnel)
                    </label>
                    <input
                      type="number"
                      id="capacite_max"
                      name="capacite_max"
                      value={formData.capacite_max}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Nombre maximum de participants"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600">
                      <Plus className="h-5 w-5 mr-2" />
                      Créer l'événement
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar avec conseils */}
          <div className="col-span-4">
            <Card className="border-blue-100 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Bookmark className="h-5 w-5 mr-2" />
                  <span>Conseils pour votre événement</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3"><Briefcase className="h-4 w-4 text-blue-600" /></div>
                  <p className="text-sm text-blue-700"><strong>Un titre clair et descriptif</strong> attire plus de participants.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3"><Calendar className="h-4 w-4 text-blue-600" /></div>
                  <p className="text-sm text-blue-700"><strong>Planifiez à l'avance</strong> - les événements publiés 2-3 semaines à l'avance ont plus de succès.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3"><MapPin className="h-4 w-4 text-blue-600" /></div>
                  <p className="text-sm text-blue-700"><strong>Précisez bien le lieu</strong> ou fournissez un lien de connexion clair pour les événements en ligne.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3"><Users className="h-4 w-4 text-blue-600" /></div>
                  <p className="text-sm text-blue-700"><strong>Une capacité raisonnable</strong> permet de mieux gérer les inscriptions.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}