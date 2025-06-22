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

  const companyAnnouncements = await prisma.annonce.findMany({
    where: {
      createurId: session.user.id,
    },
    orderBy: {
      date_publication: 'desc'
    }
  });

  // CORRECTION : On simule les champs manquants pour éviter l'erreur de type.
  // Idéalement, vous devriez ajouter `type_annonce`, `date_expiration` et `status`
  // à votre modèle `Annonce` dans `schema.prisma`.
  const formattedAnnouncements = companyAnnouncements.map(ann => ({
    ...ann,
    type_annonce: "emploi", // Valeur par défaut
    date_expiration: ann.date_publication ? new Date(ann.date_publication.getTime() + 30 * 24 * 60 * 60 * 1000) : null, // Expire dans 30 jours (exemple)
    status: 'active' as 'active' | 'archived' | 'draft', // Valeur par défaut
  }));

  // L'erreur sur initialAnnouncements est maintenant résolue.
  return <ManageAnnouncementsClient initialAnnouncements={formattedAnnouncements} />;
}