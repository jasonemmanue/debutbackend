// app/(dashboard)/client/events/page.tsx
"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search, Calendar, ArrowRight, ChevronLeft, 
  Clock, Bell, Settings, TrendingUp, MessageSquare,
  CheckCircle2, XCircle, MapPin, Users, Plus,
  FileText, Briefcase, ChevronDown, Filter
} from "lucide-react"

// Note: Les données sont maintenant simulées car nous n'avons pas la logique de récupération
// de données réelles pour cette page spécifique. Vous devrez remplacer cela par une
// récupération de données similaire à celle de la page "Mes Candidatures".
export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState("events")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeEventTab, setActiveEventTab] = useState("upcoming")

  const userProfile = {
    name: "Jean Dupont",
    type: "Particulier",
    avatar: "https://placehold.co/80x80/E0E7FF/3730A3?text=JD",
    interests: ["Technologie", "Marketing", "Développement"],
    joinDate: "Janvier 2024"
  }

  const events = [
    {
      id_calendrier_entree: 1,
      statut_participation: "confirmed",
      event: {
        id: 101,
        title: "Forum des Métiers Tech",
        date: "2025-07-15",
        time: "09:00",
        location: "Paris Expo Porte de Versailles",
        organizer: "Tech Alliance",
        category: "Forum emploi",
        capacity: 500,
        registered: 245,
      }
    },
    {
      id_calendrier_entree: 2,
      statut_participation: "pending",
      event: {
        id: 102,
        title: "Atelier CV et LinkedIn",
        date: "2025-08-22",
        time: "14:00",
        location: "En ligne",
        organizer: "CareerBoost",
        category: "Atelier",
        capacity: 100,
        registered: 78,
      }
    }
  ]

  const upcomingEvents = events.filter(ev => 
    new Date(ev.event.date) >= new Date() && (ev.statut_participation === "confirmed" || ev.statut_participation === "pending")
  )
  const pastEvents = events.filter(ev => 
    new Date(ev.event.date) < new Date() || ev.statut_participation === "cancelled"
  )

  const onBackToHome = () => {
    // Logique pour retourner en arrière
    console.log("Retour");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-6 sm:p-8">
       <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mes Événements</h1>
            <Button>
                <Plus className="h-4 w-4 mr-2" />
                Trouver un événement
            </Button>
        </div>
        
        <div className="flex border-b mb-6">
            <button onClick={() => setActiveEventTab("upcoming")} className={`px-4 py-2 font-medium text-sm ${activeEventTab === "upcoming" ? "border-b-2 border-purple-500 text-purple-600" : "text-gray-500 hover:text-gray-700"}`}>
                À venir
            </button>
            <button onClick={() => setActiveEventTab("past")} className={`px-4 py-2 font-medium text-sm ${activeEventTab === "past" ? "border-b-2 border-purple-500 text-purple-600" : "text-gray-500 hover:text-gray-700"}`}>
                Passés/Annulés
            </button>
        </div>

        {activeEventTab === "upcoming" && (
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((ev) => (
                <Card key={ev.id_calendrier_entree}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{ev.event.title}</h3>
                        <div className="flex items-center mt-1 space-x-2">
                          <Badge variant="outline">{ev.event.category}</Badge>
                          <Badge className={ev.statut_participation === "confirmed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                            {ev.statut_participation === "confirmed" ? "Confirmé" : "En attente"}
                          </Badge>
                        </div>
                        <div className="mt-3 text-sm text-gray-600 space-y-1">
                          <p className="flex items-center"><Calendar className="h-4 w-4 mr-1.5" />{new Date(ev.event.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} • {ev.event.time}</p>
                          <p className="flex items-center"><MapPin className="h-4 w-4 mr-1.5" />{ev.event.location}</p>
                          <p className="flex items-center"><Users className="h-4 w-4 mr-1.5" />{ev.event.registered}/{ev.event.capacity} participants</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">Voir détails</Button>
                        <Button variant="destructive" size="sm">Annuler</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card><CardContent className="p-8 text-center"><p>Aucun événement à venir.</p></CardContent></Card>
            )}
          </div>
        )}
        {/* ... Ajouter la logique pour les événements passés ... */}
    </div>
  )
}