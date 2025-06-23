// app/company/[id]/announcements/CompanyAnnouncementsClient.tsx
"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Heart, MessageSquare, Send } from "lucide-react";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { TypeReactionEnum } from "@prisma/client";
import Link from 'next/link';

// Définition des types pour les données que le composant reçoit
type UserInfo = { name: string | null; email: string | null; };
type Comment = { id: string; contenu: string; date_creation: Date; abonne: UserInfo; };
type Reaction = { type_reaction: TypeReactionEnum };
type AnnouncementWithDetails = {
    id: string;
    titre: string;
    contenu: string | null;
    date_publication: Date | null;
    commentaires: Comment[];
    reactions: Reaction[]; // Réaction de l'utilisateur actuel
    _count: { reactions: number; commentaires: number };
};

interface CompanyAnnouncementsClientProps {
  initialAnnouncements: AnnouncementWithDetails[];
  isUserLoggedIn: boolean;
}

export function CompanyAnnouncementsClient({ initialAnnouncements, isUserLoggedIn }: CompanyAnnouncementsClientProps) {
    const [announcements, setAnnouncements] = useState(initialAnnouncements);
    const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

    // Gère le clic sur le bouton "like"
    const handleReaction = async (annonceId: string, currentReactions: Reaction[], currentCount: number) => {
        if (!isUserLoggedIn) return;

        const hasReacted = currentReactions.length > 0;
        const newReactionCount = hasReacted ? currentCount - 1 : currentCount + 1;
        const newReactionsArray = hasReacted ? [] : [{ type_reaction: 'like' as TypeReactionEnum }];
        
        // Mise à jour optimiste de l'UI
        setAnnouncements(prev => prev.map(ann => 
            ann.id === annonceId 
            ? { ...ann, reactions: newReactionsArray, _count: {...ann._count, reactions: newReactionCount} } 
            : ann
        ));

        try {
            await fetch(`/api/announcements/${annonceId}/reactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type_reaction: 'like' }),
            });
        } catch (error) {
            console.error("Erreur lors de la réaction", error);
            // Rollback en cas d'erreur
             setAnnouncements(prev => prev.map(ann => 
                ann.id === annonceId 
                ? { ...ann, reactions: currentReactions, _count: {...ann._count, reactions: currentCount} } 
                : ann
            ));
        }
    };

    const handleCommentChange = (annonceId: string, value: string) => {
        setNewComment(prev => ({ ...prev, [annonceId]: value }));
    };

    // Gère la soumission d'un nouveau commentaire
    const handleCommentSubmit = async (annonceId: string) => {
        if (!isUserLoggedIn || !newComment[annonceId]?.trim()) return;
        
        setIsLoading(prev => ({ ...prev, [annonceId]: true }));
        try {
            const response = await fetch(`/api/announcements/${annonceId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contenu: newComment[annonceId] }),
            });
            if (!response.ok) throw new Error("Erreur lors de l'envoi du commentaire");
            
            const addedComment = await response.json();

            setAnnouncements(prev => prev.map(ann => 
                ann.id === annonceId 
                ? { ...ann, commentaires: [...ann.commentaires, addedComment], _count: {...ann._count, commentaires: ann._count.commentaires + 1} } 
                : ann
            ));
            setNewComment(prev => ({ ...prev, [annonceId]: '' }));

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(prev => ({ ...prev, [annonceId]: false }));
        }
    };

    if (announcements.length === 0) {
        return <Card className="text-center p-8 mt-8 bg-gray-50"><p className="text-gray-500">Cette entreprise n'a publié aucune annonce pour le moment.</p></Card>;
    }

    return (
        <div className="space-y-6">
            {announcements.map(ann => (
                <Card key={ann.id} className="shadow-md">
                    <CardHeader>
                        <CardTitle>{ann.titre}</CardTitle>
                        <p className="text-sm text-gray-500">
                            Publié le {ann.date_publication ? format(new Date(ann.date_publication), 'd MMMM yyyy \'à\' HH:mm', { locale: fr }) : ''}
                        </p>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap text-gray-800">{ann.contenu}</p>
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                            <Button variant="ghost" size="sm" onClick={() => handleReaction(ann.id, ann.reactions, ann._count.reactions)} disabled={!isUserLoggedIn}>
                                <Heart className={`h-5 w-5 mr-2 transition-colors ${ann.reactions.length > 0 ? 'text-red-500 fill-current' : 'text-gray-500'}`} /> 
                                {ann._count.reactions}
                            </Button>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MessageSquare className="h-5 w-5" /> {ann._count.commentaires}
                            </div>
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0">
                        <div className="space-y-3 mb-4">
                            {ann.commentaires.map(comment => (
                                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg border">
                                    <p className="text-xs text-gray-500 font-semibold">{comment.abonne.name}</p>
                                    <p className="text-sm">{comment.contenu}</p>
                                    <p className="text-xs text-gray-400 mt-1 text-right">{format(new Date(comment.date_creation), 'Pp', { locale: fr })}</p>
                                </div>
                            ))}
                        </div>
                        {isUserLoggedIn ? (
                             <div className="flex items-start gap-2">
                                <Textarea 
                                    placeholder="Ajoutez votre commentaire..." 
                                    value={newComment[ann.id] || ''}
                                    onChange={(e) => handleCommentChange(ann.id, e.target.value)}
                                    rows={1}
                                    className="resize-none focus:ring-rose-500"
                                />
                                <Button onClick={() => handleCommentSubmit(ann.id)} disabled={isLoading[ann.id] || !newComment[ann.id]?.trim()}>
                                    {isLoading[ann.id] ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4"/>}
                                </Button>
                            </div>
                        ) : (
                            <p className="text-sm text-center text-gray-500 bg-gray-100 p-3 rounded-md">
                                <Link href="/auth/login" className="text-rose-600 font-semibold">Connectez-vous</Link> pour commenter et réagir.
                            </p>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
}