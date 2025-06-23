// app/(dashboard)/company/announcements/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ManageAnnouncementsClient from "./ManageAnnouncementsClient";

export default async function ManageAnnouncementsPage() {
  const session = await auth();

  if (!session?.user || (session.user.type !== 'entreprise' && session.user.type !== 'employe')) {
    redirect('/auth/login');
  }

  // Récupérer les annonces avec le compte des réactions et les commentaires associés
  const companyAnnouncements = await prisma.annonce.findMany({
    where: {
      createurId: session.user.id,
    },
    include: {
      // Compter les réactions pour chaque type
      _count: {
        select: { reactions: true },
      },
      // Inclure les commentaires avec les informations de l'auteur
      commentaires: {
        include: {
          abonne: {
            select: { name: true, email: true }
          }
        },
        orderBy: {
          date_creation: 'asc'
        }
      }
    },
    orderBy: {
      date_publication: 'desc'
    }
  });

  return <ManageAnnouncementsClient initialAnnouncements={companyAnnouncements} />;
}