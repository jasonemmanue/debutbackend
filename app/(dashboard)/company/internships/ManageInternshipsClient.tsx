// /app/(dashboard)/company/internships/ManageInternshipsClient.tsx
"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ChevronLeft, Edit, Users, Loader2, Check, X, ChevronDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from 'next/navigation';
// [NOUVEAU] Importation des composants pour le menu dépliant
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Types attendus depuis la page serveur
type Offer = {
  id: string;
  titre: string;
  description: string | null;
  duree_stage: string | null;
  date_debut: Date | null;
  competences_requises: string | null;
  niveau_etude_requis: string | null;
  remunere: boolean;
  _count: { demandes: number };
};

type Application = {
  id: string;
  stageId: string;
  statut: 'en_attente' | 'accepte' | 'refuse';
  stagiaire: {
    niveau_etudes: string | null;
    domaine_etudes: string | null;
    competences: string | null;
    user: {
      name: string | null;
      email: string | null;
    }
  }
};

interface ManageInternshipsClientProps {
  initialOffers: Offer[];
  initialApplications: Application[];
}

export default function ManageInternshipsClient({ initialOffers, initialApplications }: ManageInternshipsClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("offers");
  const [offers] = useState<Offer[]>(initialOffers);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [currentOffer, setCurrentOffer] = useState<Partial<Offer> | null>(null);
  const [viewingApplicationsFor, setViewingApplicationsFor] = useState<Offer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch('/api/company/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentOffer),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Erreur lors de la sauvegarde");
      }
      router.refresh();
      setActiveTab("offers");
      setCurrentOffer(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleApplicationStatus = async (applicationId: string, status: 'accepte' | 'refuse') => {
    setApplications(apps => apps.map(app => app.id === applicationId ? {...app, statut: status} : app));
    try {
      await fetch(`/api/company/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      // Optionnel: rafraîchir les données pour être sûr
      router.refresh();
    } catch (error) {
      console.error("Erreur mise à jour statut", error);
    }
  };

  const handleCreateNew = () => {
    setCurrentOffer({
      titre: "",
      description: "",
      duree_stage: "",
      competences_requises: "",
      niveau_etude_requis: "",
      remunere: false
    });
    setActiveTab("edit");
  };

  const handleViewApplications = (offer: Offer) => {
    setViewingApplicationsFor(offer);
    setActiveTab("applications");
  };

  if (activeTab === "edit" && currentOffer) {
     return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{currentOffer.id ? "Modifier" : "Créer"} une offre de stage</CardTitle>
                    <Button variant="ghost" onClick={() => { setActiveTab('offers'); setCurrentOffer(null); }}><ChevronLeft className="mr-2 h-4 w-4" /> Annuler</Button>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSaveOffer} className="space-y-6">
                    <div>
                        <Label htmlFor="titre">Titre du stage *</Label>
                        <Input id="titre" value={currentOffer.titre || ''} onChange={(e) => setCurrentOffer({ ...currentOffer, titre: e.target.value })} required />
                    </div>
                    <div>
                        <Label htmlFor="description">Description complète *</Label>
                        <Textarea id="description" placeholder="Missions, profil recherché, avantages..." value={currentOffer.description || ''} onChange={(e) => setCurrentOffer({ ...currentOffer, description: e.target.value })} required rows={5} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="duree">Durée *</Label>
                            <Input id="duree" placeholder="Ex: 6 mois" value={currentOffer.duree_stage || ''} onChange={(e) => setCurrentOffer({ ...currentOffer, duree_stage: e.target.value })} required />
                        </div>
                        <div>
                            <Label htmlFor="niveau">Niveau requis *</Label>
                            <Input id="niveau" placeholder="Ex: Bac+5" value={currentOffer.niveau_etude_requis || ''} onChange={(e) => setCurrentOffer({ ...currentOffer, niveau_etude_requis: e.target.value })} required />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="competences">Compétences requises *</Label>
                        <Input id="competences" placeholder="Ex: React, Node.js, Gestion de projet" value={currentOffer.competences_requises || ''} onChange={(e) => setCurrentOffer({ ...currentOffer, competences_requises: e.target.value })} required />
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <Switch id="remunere" checked={!!currentOffer.remunere} onCheckedChange={(checked) => setCurrentOffer({ ...currentOffer, remunere: checked })} />
                        <Label htmlFor="remunere">Stage rémunéré</Label>
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : "Sauvegarder l'offre"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
     );
  }
  
  if (activeTab === "applications" && viewingApplicationsFor) {
    const relevantApplications = applications.filter(app => app.stageId === viewingApplicationsFor.id);
    return (
      <>
        <Button variant="ghost" onClick={() => setActiveTab('offers')}><ChevronLeft className="mr-2 h-4 w-4" />Retour aux offres</Button>
        <h2 className="text-2xl font-bold mt-4">Candidatures pour "{viewingApplicationsFor.titre}"</h2>
        <div className="mt-4 space-y-2">
          {relevantApplications.length > 0 ? relevantApplications.map((app) => (
            <Collapsible key={app.id} className="space-y-2">
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{app.stagiaire.user.name}</p>
                    <p className="text-sm text-gray-500">{app.stagiaire.user.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm">
                            Détails <ChevronDown className="h-4 w-4 ml-2"/>
                        </Button>
                     </CollapsibleTrigger>
                    {app.statut === 'en_attente' ? (
                      <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-green-600 border-green-400 hover:bg-green-50" onClick={() => handleApplicationStatus(app.id, 'accepte')}><Check className="mr-1 h-4 w-4"/>Accepter</Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-400 hover:bg-red-50" onClick={() => handleApplicationStatus(app.id, 'refuse')}><X className="mr-1 h-4 w-4"/>Refuser</Button>
                      </div>
                    ) : (
                      <Badge className={app.statut === 'accepte' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>{app.statut === 'accepte' ? 'Acceptée' : 'Refusée'}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
              <CollapsibleContent>
                <Card className="p-4 bg-gray-50 border-gray-200">
                    <h4 className="font-semibold mb-3">Profil du candidat</h4>
                    <div className="space-y-2 text-sm">
                        <p><strong>Niveau d'études :</strong> {app.stagiaire.niveau_etudes || 'Non renseigné'}</p>
                        <p><strong>Domaine d'étude :</strong> {app.stagiaire.domaine_etudes || 'Non renseigné'}</p>
                        <p><strong>Compétences :</strong> {app.stagiaire.competences || 'Non renseignées'}</p>
                    </div>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          )) : <p className="text-gray-500 text-center py-4">Aucune candidature pour cette offre pour le moment.</p>}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Stages</h1>
        <Button onClick={handleCreateNew}><Plus className="mr-2 h-4 w-4" />Nouvelle Offre</Button>
      </div>
      <div className="space-y-4">
        {offers.length > 0 ? offers.map((offer) => (
          <Card key={offer.id}>
            <CardContent className="p-4 flex flex-wrap gap-4 justify-between items-center">
              <h3 className="font-semibold text-lg">{offer.titre}</h3>
              <div className="flex items-center gap-4">
                 <Badge variant="secondary">{offer._count.demandes} candidature(s)</Badge>
                 <Button variant="outline" size="sm" onClick={() => handleViewApplications(offer)}>
                   <Users className="mr-2 h-4 w-4"/> Voir les candidatures
                 </Button>
                 <Button variant="ghost" size="icon" onClick={() => { setCurrentOffer(offer); setActiveTab('edit'); }}><Edit className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        )) : <p className="text-gray-500 text-center py-4">Aucune offre de stage créée. Cliquez sur "Nouvelle Offre" pour commencer.</p>}
      </div>
    </>
  );
}