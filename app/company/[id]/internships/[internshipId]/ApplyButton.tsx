// /app/company/[id]/internships/[internshipId]/ApplyButton.tsx
"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, FileText, Heart } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ApplyButtonProps {
    stageId: string;
    companyId: string;
}

interface StagiaireStatus {
    isFollowing: boolean;
    hasApplied: boolean;
}

export default function ApplyButton({ stageId, companyId }: ApplyButtonProps) {
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();
    const [stagiaireStatus, setStagiaireStatus] = useState<StagiaireStatus | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            fetch(`/api/client/status?companyId=${companyId}&stageId=${stageId}`)
                .then(res => res.json())
                .then(data => {
                    setStagiaireStatus(data);
                    setIsLoading(false);
                });
        }
        if (sessionStatus === 'unauthenticated') {
            setIsLoading(false);
        }
    }, [sessionStatus, companyId, stageId]);

    const handleFollow = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/follow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entrepriseId: companyId, action: 'follow' })
            });
            if (!response.ok) throw new Error("Impossible de suivre l'entreprise.");
            setStagiaireStatus(prev => prev ? { ...prev, isFollowing: true } : null);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleApply = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/client/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stageId }),
            });
            if (!response.ok) throw new Error("Erreur lors de la candidature.");
            setStagiaireStatus(prev => prev ? { ...prev, hasApplied: true } : null);
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading || sessionStatus === 'loading') {
        return <Button disabled className="w-full"><Loader2 className="animate-spin mr-2" /> Chargement...</Button>;
    }

    if (!session) {
        return <Link href="/auth/login"><Button className="w-full">Se connecter pour postuler</Button></Link>;
    }
    
    if (!stagiaireStatus) return null;

    if (stagiaireStatus.hasApplied) {
        return <Button disabled variant="outline" className="w-full border-green-300 text-green-600 bg-green-50"><CheckCircle className="mr-2 h-4 w-4" /> Candidature envoyée</Button>;
    }
    
    // [MODIFIÉ] La vérification du profil a été supprimée.
    // On passe directement à la vérification du statut de suivi.
    if (!stagiaireStatus.isFollowing) {
        return (
            <div className="text-center p-4 bg-rose-50 border border-rose-200 rounded-lg">
                <p className="mb-3 font-medium text-gray-700">Vous devez suivre cette entreprise pour pouvoir postuler.</p>
                <Button onClick={handleFollow} disabled={isLoading} className="w-full bg-rose-500 hover:bg-rose-600">
                    {isLoading ? <Loader2 className="animate-spin" /> : <><Heart className="mr-2 h-4 w-4" /> Suivre l'entreprise</>}
                </Button>
            </div>
        );
    }

    // Le bouton final si tout est en ordre
    return (
        <Button onClick={handleApply} disabled={isLoading} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : <FileText className="mr-2 h-4 w-4" />}
            Postuler maintenant
        </Button>
    );
}