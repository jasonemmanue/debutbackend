// app/company/[id]/announcements/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
// Le nom du client a été corrigé pour correspondre à ce que nous allons créer
import { CompanyAnnouncementsClient } from './CompanyAnnouncementsClient';

export default async function CompanyAnnouncementsPage({ params }: { params: { id: string } }) {
    const session = await auth();

    // 1. D'abord, on récupère les détails de l'entreprise pour avoir son nom et surtout l'ID de l'utilisateur associé.
    const company = await prisma.entreprise.findUnique({
        where: { id: params.id },
        include: {
            user: { select: { id: true, name: true } }
        }
    });

    if (!company || !company.user) {
        notFound();
    }

    // 2. Ensuite, on utilise l'ID de l'utilisateur ('createurId') pour trouver toutes les annonces qu'il a créées.
    // C'est la requête corrigée qui résout l'erreur.
    const announcements = await prisma.annonce.findMany({
        where: {
            createurId: company.user.id
        },
        orderBy: { date_publication: 'desc' },
        include: {
            _count: { select: { reactions: true, commentaires: true } },
            // On inclut la réaction de l'utilisateur actuellement connecté (s'il existe)
            reactions: {
                where: { abonneId: session?.user?.id ?? undefined }
            },
            commentaires: {
                orderBy: { date_creation: 'asc' },
                include: {
                    abonne: {
                        select: { name: true, email: true }
                    }
                }
            }
        }
    });

    const logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.user.name || 'E')}&background=E9D5FF&color=3730A3`;

    return (
        <div className="container mx-auto py-12 px-6">
            <div className="flex items-center mb-8 border-b pb-6">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 shadow-md">
                    <Image src={logoUrl} alt={`${company.user.name} logo`} fill className="object-cover" />
                </div>
                <div>
                    <p className="text-sm text-gray-600">Annonces de</p>
                    <Link href={`/company/${company.id}`} className="text-3xl font-bold text-gray-800 hover:text-rose-600">{company.user.name}</Link>
                </div>
            </div>

            {/* Le composant client reçoit maintenant la liste d'annonces correcte */}
            <CompanyAnnouncementsClient
                initialAnnouncements={announcements}
                isUserLoggedIn={!!session?.user}
            />
        </div>
    );
}