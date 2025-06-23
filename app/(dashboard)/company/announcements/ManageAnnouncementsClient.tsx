// app/(dashboard)/company/announcements/ManageAnnouncementsClient.tsx
"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Heart, MessageSquare, ThumbsUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Types pour les données reçues du serveur
type UserInfo = { name: string | null; email: string | null; };
type Comment = { id: string; contenu: string; date_creation: Date; abonne: UserInfo; };
type Announcement = {
  id: string;
  titre: string;
  contenu: string | null;
  date_publication: Date | null;
  commentaires: Comment[];
  _count: { reactions: number };
};

interface ManageAnnouncementsClientProps {
  initialAnnouncements: Announcement[];
}

export default function ManageAnnouncementsClient({ initialAnnouncements }: ManageAnnouncementsClientProps) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [newAnnouncement, setNewAnnouncement] = useState({ titre: '', contenu: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/company/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnnouncement),
      });
      if (!response.ok) throw new Error("Erreur lors de la création de l'annonce");
      
      const created = await response.json();
      // Ajout des champs manquants pour l'affichage immédiat
      setAnnouncements(prev => [{ ...created, commentaires: [], _count: { reactions: 0 } }, ...prev]);
      setNewAnnouncement({ titre: '', contenu: '' });

    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteComment = async (commentId: string, annonceId: string) => {
     // Mise à jour optimiste de l'UI
     setAnnouncements(prev => prev.map(ann => 
        ann.id === annonceId 
        ? { ...ann, commentaires: ann.commentaires.filter(c => c.id !== commentId) } 
        : ann
     ));

     try {
       await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });
     } catch (error) {
       console.error("Erreur suppression commentaire:", error);
       // Rollback en cas d'erreur (non implémenté pour la simplicité, mais serait ici)
       alert("Impossible de supprimer le commentaire.");
     }
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader><CardTitle>Publier une nouvelle annonce</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleCreateAnnouncement} className="space-y-4">
            <div>
              <Label htmlFor="titre">Titre</Label>
              <Input id="titre" value={newAnnouncement.titre} onChange={e => setNewAnnouncement({...newAnnouncement, titre: e.target.value})} required/>
            </div>
            <div>
              <Label htmlFor="contenu">Contenu</Label>
              <Textarea id="contenu" value={newAnnouncement.contenu} onChange={e => setNewAnnouncement({...newAnnouncement, contenu: e.target.value})} required/>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
              Publier
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Mes Annonces Publiées</h2>
        <div className="space-y-6">
          {announcements.map(ann => (
            <Card key={ann.id}>
              <CardHeader>
                  <CardTitle>{ann.titre}</CardTitle>
                  <p className="text-sm text-gray-500">
                    Publié le {ann.date_publication ? format(new Date(ann.date_publication), 'd MMMM yyyy', { locale: fr }) : ''}
                  </p>
              </CardHeader>
              <CardContent>
                  <p className="whitespace-pre-wrap">{ann.contenu}</p>
                  <div className="flex items-center gap-4 mt-4 text-gray-600">
                      <div className="flex items-center gap-1"><Heart className="h-4 w-4" /> {ann._count.reactions}</div>
                      <div className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {ann.commentaires.length}</div>
                  </div>
              </CardContent>
              <div className="p-6 pt-0">
                  <h4 className="font-semibold text-sm mb-2">Commentaires</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {ann.commentaires.length > 0 ? ann.commentaires.map(comment => (
                       <div key={comment.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
                           <div>
                               <p className="text-xs text-gray-500">{comment.abonne.email}</p>
                               <p className="text-sm">{comment.contenu}</p>
                               <p className="text-xs text-gray-400 mt-1">{format(new Date(comment.date_creation), 'Pp', { locale: fr })}</p>
                           </div>
                           <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteComment(comment.id, ann.id)}>
                             <Trash2 className="h-4 w-4"/>
                           </Button>
                       </div>
                    )) : <p className="text-sm text-gray-400">Aucun commentaire.</p>}
                  </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}