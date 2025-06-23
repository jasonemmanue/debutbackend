// /app/(dashboard)/company/prestations/new/page.tsx
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function NewPrestationPage() {
    const router = useRouter();
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [tarif, setTarif] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('/api/company/prestations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titre, description, tarif: parseFloat(tarif) }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Erreur lors de la création de la prestation.");
            }
            
            setSuccessMessage("Prestation créée avec succès !");

            // [CORRIGÉ] On vide les champs au lieu de rediriger
            setTitre('');
            setDescription('');
            setTarif('');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Créer une nouvelle prestation</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="titre">Titre de la prestation *</Label>
                            <Input id="titre" value={titre} onChange={(e) => setTitre(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="tarif">Tarif (en €) *</Label>
                            <Input id="tarif" type="number" value={tarif} onChange={(e) => setTarif(e.target.value)} required />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="button" variant="ghost" onClick={() => router.back()}>Retour</Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                                Terminé et Enregistrer
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
