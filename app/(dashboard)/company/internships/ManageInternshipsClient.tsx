// app/(dashboard)/company/internships/ManageInternshipsClient.tsx
"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search, ChevronLeft, Bell, Settings, Plus, Briefcase, Edit, Trash2,
  Calendar, Clock, Check, X, ArrowRight, Filter, ChevronDown, Users,
  FileText, DollarSign, GraduationCap, MoreVertical
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

type Offer = {
  id: string;
  titre_stage: string;
  description_stage: string | null;
  duree_stage: string;
  date_debut_prevue: Date | null;
  competences_requises: string | null;
  niveau_etude_requis: string | null;
  remunere: boolean;
  statut: string;
  candidatures: number;
};

type Application = {
  id: string;
  id_stage: string;
  candidat: string;
  date: string;
  status: string;
  message: string;
  cv: string;
};

interface ManageInternshipsClientProps {
  initialOffers: Offer[];
  initialApplications: Application[];
}

export default function ManageInternshipsClient({ initialOffers, initialApplications }: ManageInternshipsClientProps) {
  const [activeTab, setActiveTab] = useState("offers")
  const [offers, setOffers] = useState(initialOffers);
  const [applications, setApplications] = useState(initialApplications);
  const [currentOffer, setCurrentOffer] = useState<Partial<Offer> | null>(null);
  const [viewingApplicationsFor, setViewingApplicationsFor] = useState<string | null>(null);

  const studyLevels = ["Bac", "Bac+1", "Bac+2", "Bac+3", "Bac+4", "Bac+5 et plus"];
  
  const handleCreateNew = () => {
    setCurrentOffer({ titre_stage: "", description_stage: "", duree_stage: "3 mois", date_debut_prevue: null, competences_requises: "", niveau_etude_requis: "Bac+3", remunere: false, statut: "draft" });
    setActiveTab("edit");
  };

  const handleEdit = (offer: Offer) => {
    setCurrentOffer({ ...offer });
    setActiveTab("edit");
  };
  
  const handleViewApplications = (offerId: string) => {
    setViewingApplicationsFor(offerId);
    setActiveTab("applications");
  };
  
  return (
    <div className="space-y-8">
      {activeTab === "offers" && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gérer les offres de stage</h2>
            <Button onClick={handleCreateNew}><Plus className="h-4 w-4 mr-2" />Nouvelle offre</Button>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              {offers.map((offer) => (
                <Card key={offer.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{offer.titre_stage}</h3>
                        <div className="flex items-center flex-wrap gap-2 mt-2">
                           <Badge variant="outline"><Users className="h-3 w-3 mr-1" />{offer.candidatures} candidature(s)</Badge>
                           <Badge variant="outline"><Calendar className="h-3 w-3 mr-1" />{offer.duree_stage}</Badge>
                           <Badge variant="outline"><GraduationCap className="h-3 w-3 mr-1" />{offer.niveau_etude_requis}</Badge>
                        </div>
                      </div>
                       <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewApplications(offer.id)}>Candidatures</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(offer)}><Edit className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "edit" && currentOffer && (
        <>
          <h2 className="text-2xl font-bold">{'id' in currentOffer ? "Modifier" : "Créer"} une offre</h2>
          <Card><CardContent className="p-6 space-y-4">
            <div className="space-y-2"><Label>Titre</Label><Input value={currentOffer.titre_stage}/></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={currentOffer.description_stage || ''}/></div>
             <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setActiveTab('offers')}>Annuler</Button>
                <Button>Sauvegarder</Button>
             </div>
          </CardContent></Card>
        </>
      )}

      {activeTab === "applications" && (
         <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Candidatures reçues</h2>
            <Button variant="outline" onClick={() => setActiveTab('offers')}>
                <ChevronLeft className="h-4 w-4 mr-2" /> Retour aux offres
            </Button>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
                {applications.filter(app => !viewingApplicationsFor || app.id_stage === viewingApplicationsFor).map(app => (
                    <Card key={app.id}>
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{app.candidat}</p>
                                <p className="text-sm text-gray-500">Postulé le: {new Date(app.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={app.status === 'accepte' ? 'default' : app.status === 'refuse' ? 'destructive' : 'secondary'}>{app.status}</Badge>
                                <Button size="sm" variant="outline">Voir CV</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
          </Card>
         </>
      )}
    </div>
  )
}