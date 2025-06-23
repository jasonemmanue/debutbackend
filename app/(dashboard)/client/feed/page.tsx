// app/(dashboard)/client/feed/page.tsx
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Heart, MessageSquare, Send } from "lucide-react";
import { TypeReactionEnum } from "@prisma/client";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// Définition des types pour les données que le composant reçoit
type UserInfo = { name: string | null; email: string | null; };
type Comment = { id: string; contenu: string; date_creation: Date; abonne: UserInfo; };
type Reaction = { type_reaction: TypeReactionEnum };
type AnnouncementFeedItem = {
    id: string;
    titre: string;
    contenu: string | null;
    date_publication: Date | null;
    createur: { name: string | null };
    reactions: Reaction[];
    commentaires: Comment[];
    _count: { reactions: number; commentaires: number };
};

export default function NewsFeedPage() {
    const { data: session } = useSession();
    const [feed, setFeed] = useState<AnnouncementFeedItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
    const [isSubmittingComment, setIsSubmittingComment] = useState<{ [key: string]: boolean }>({});
    const commentEndRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        const fetchFeed = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/feed');
                if (!response.ok) throw new Error("Erreur de chargement du fil d'actualité");
                const data = await response.json();
                setFeed(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeed();
    }, []);

    const handleReaction = async (annonceId: string, type: TypeReactionEnum) => {
        if (!session) return;
        const originalFeed = [...feed];
        setFeed(prevFeed => prevFeed.map(ann => {
            if (ann.id === annonceId) {
                const hasReacted = ann.reactions.some(r => r.type_reaction === type);
                const newReactionCount = hasReacted ? ann._count.reactions - 1 : ann._count.reactions + 1;
                const newReactionsArray = hasReacted ? [] : [{ type_reaction: type }];
                return { ...ann, reactions: newReactionsArray, _count: { ...ann._count, reactions: newReactionCount } };
            }
            return ann;
        }));
        try {
            await fetch(`/api/announcements/${annonceId}/reactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type_reaction: type }),
            });
        } catch (error) {
            console.error("Erreur lors de la réaction", error);
            setFeed(originalFeed);
        }
    };

    const handleCommentChange = (annonceId: string, value: string) => {
        setNewComment(prev => ({ ...prev, [annonceId]: value }));
    };

    const handleCommentSubmit = async (annonceId: string) => {
        if (!session || !newComment[annonceId]?.trim()) return;

        setIsSubmittingComment(prev => ({ ...prev, [annonceId]: true }));
        try {
            const response = await fetch(`/api/announcements/${annonceId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contenu: newComment[annonceId] }),
            });
            if (!response.ok) throw new Error("Erreur lors de l'envoi du commentaire");
            
            const addedComment: Comment = await response.json();

            setFeed(prevFeed => prevFeed.map(ann => {
                if (ann.id === annonceId) {
                    return {
                        ...ann,
                        commentaires: [...ann.commentaires, addedComment],
                        _count: { ...ann._count, commentaires: ann._count.commentaires + 1 }
                    };
                }
                return ann;
            }));

            setTimeout(() => {
                commentEndRefs.current[annonceId]?.scrollIntoView({ behavior: 'smooth' });
            }, 100);

            setNewComment(prev => ({ ...prev, [annonceId]: '' }));

        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue lors de l'envoi du commentaire.");
        } finally {
            setIsSubmittingComment(prev => ({ ...prev, [annonceId]: false }));
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Mon fil d'actualité</h1>
                <div className="max-w-3xl mx-auto space-y-6">
                    {feed.length === 0 && !isLoading ? (
                        <Card className="text-center p-8 bg-white shadow-lg">
                            <p className="text-gray-500">Votre fil est vide. Suivez des entreprises pour voir leurs actualités ici !</p>
                            <Link href="/compagnies/categories">
                                <Button className="mt-4">Découvrir des entreprises</Button>
                            </Link>
                        </Card>
                    ) : (
                        feed.map(announcement => (
                            <Card key={announcement.id} className="shadow-lg">
                                <CardHeader>
                                    <CardTitle>{announcement.titre}</CardTitle>
                                    <p className="text-sm text-gray-600 font-medium">par {announcement.createur.name}</p>
                                    <p className="text-xs text-gray-400">
                                        {announcement.date_publication ? format(new Date(announcement.date_publication), "d MMMM yyyy 'à' HH:mm", { locale: fr }) : ''}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <p className="whitespace-pre-wrap text-gray-700">{announcement.contenu}</p>
                                    <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={() => handleReaction(announcement.id, 'like')} 
                                            disabled={!session}
                                        >
                                            <Heart className={`h-4 w-4 mr-2 transition-colors ${announcement.reactions.length > 0 ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                                            {announcement._count.reactions}
                                        </Button>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MessageSquare className="h-4 w-4" />
                                            <span>{announcement._count.commentaires} Commentaire(s)</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-2">
                                        {announcement.commentaires.map(comment => (
                                            <div key={comment.id} className="bg-gray-50 p-3 rounded-lg border">
                                                <p className="text-xs text-gray-500 font-semibold">{comment.abonne.name}</p>
                                                <p className="text-sm">{comment.contenu}</p>
                                            </div>
                                        ))}
                                        {/* CORRECTION : L'accolade englobe l'assignation */}
                                        <div ref={(el) => { commentEndRefs.current[announcement.id] = el; }} />
                                    </div>

                                    {session && (
                                        <div className="flex items-start gap-2 mt-4 pt-4 border-t">
                                            <Textarea
                                                placeholder="Votre commentaire..."
                                                value={newComment[announcement.id] || ''}
                                                onChange={(e) => handleCommentChange(announcement.id, e.target.value)}
                                                rows={1}
                                                className="resize-none"
                                            />
                                            <Button
                                                onClick={() => handleCommentSubmit(announcement.id)}
                                                disabled={isSubmittingComment[announcement.id] || !newComment[announcement.id]?.trim()}
                                            >
                                                {isSubmittingComment[announcement.id] ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}