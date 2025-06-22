// app/(dashboard)/company/announcements/ManageAnnouncementsClient.tsx
"use client"

import React, { useState } from 'react';
// ... (gardez tous les autres imports)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Edit, Trash2, Calendar, Clock, Check, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


type Announcement = {
  id: string;
  titre: string;
  contenu: string | null;
  date_publication: Date | null;
  createurId: string;
  type_annonce: string;
  date_expiration: Date | null;
  status: 'active' | 'archived' | 'draft';
};

interface ManageAnnouncementsClientProps {
  initialAnnouncements: Announcement[];
}

export default function ManageAnnouncementsClient({ initialAnnouncements }: ManageAnnouncementsClientProps) {
  const [activeTab, setActiveTab] = useState("list")
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Partial<Announcement> | null>(null)

  const announcementTypes = [
    { value: "emploi", label: "Offre d'emploi" },
    { value: "stage", label: "Stage" },
    { value: "alternance", label: "Alternance" },
    { value: "evenement", label: "Événement" },
    { value: "information", label: "Information" }
  ]

  const handleCreateNew = () => {
    setCurrentAnnouncement({ titre: "", contenu: "", type_annonce: "emploi", date_expiration: null, status: "draft" })
    setActiveTab("edit")
  }

  const handleEdit = (announcement: Announcement) => {
    setCurrentAnnouncement({...announcement})
    setActiveTab("edit")
  }

  const handleSave = () => { console.log("Sauvegarde:", currentAnnouncement); setActiveTab("list"); };
  const handleDelete = (id: string) => { console.log("Suppression:", id); };
  
  const formatDate = (date: Date | null) => date ? new Date(date).toLocaleDateString('fr-FR') : 'N/A';
  
  // CORRECTION: Cette fonction gère la conversion de Date|null vers une string pour l'input
  const formatInputDate = (date: Date | null | undefined) => {
    if (!date) return '';
    // Assurer que l'objet est bien une Date
    const d = new Date(date);
    // Gérer les dates invalides
    if (isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 16);
  }

  return (
    <div className="space-y-8">
        {activeTab === "list" && (
            <>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Gérer les annonces</h2>
                  <Button onClick={handleCreateNew}><Plus className="h-4 w-4 mr-2" />Nouvelle annonce</Button>
                </div>
                <Card><CardContent className="p-6 space-y-4">
                  {announcements.map((announcement) => (
                    <Card key={announcement.id}><CardContent className="p-6">
                       <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{announcement.titre}</h3>
                            <p className="mt-3 text-gray-700 line-clamp-2">{announcement.contenu}</p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(announcement)}><Edit className="h-4 w-4 mr-1" />Modifier</Button>
                            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(announcement.id)}><Trash2 className="h-4 w-4 mr-1" />Supprimer</Button>
                          </div>
                        </div>
                    </CardContent></Card>
                  ))}
                </CardContent></Card>
            </>
        )}

        {activeTab === "edit" && currentAnnouncement && (
            <>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">{'id' in currentAnnouncement ? "Modifier" : "Créer"} une annonce</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => { setActiveTab("list"); setCurrentAnnouncement(null); }}>Annuler</Button>
                    <Button onClick={handleSave}>Enregistrer</Button>
                  </div>
                </div>
                <Card><CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre *</Label>
                      <Input id="title" value={currentAnnouncement.titre} onChange={(e) => setCurrentAnnouncement({ ...currentAnnouncement, titre: e.target.value })}/>
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="content">Contenu *</Label>
                      <Textarea id="content" value={currentAnnouncement.contenu || ''} onChange={(e) => setCurrentAnnouncement({ ...currentAnnouncement, contenu: e.target.value })} rows={6} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiration">Date d'expiration</Label>
                      <Input id="expiration" type="datetime-local" 
                             value={formatInputDate(currentAnnouncement.date_expiration)} 
                             onChange={(e) => setCurrentAnnouncement({ ...currentAnnouncement, date_expiration: e.target.value ? new Date(e.target.value) : null })}
                      />
                    </div>
                </CardContent></Card>
            </>
        )}
    </div>
  )
}