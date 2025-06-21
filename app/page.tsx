import { auth } from "@/auth";
import PublicLandingPage from "@/components/dashboards/PublicLandingPage";
import { ClientDashboard } from "@/components/dashboards/ClientDashboard";
import { CompanyDashboard } from "@/components/dashboards/CompanyDashboard";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  // Si l'utilisateur est connecté et est de type entreprise ou employé
  if (user?.type === 'entreprise' || user?.type === 'employe') {
    return <CompanyDashboard user={user} />;
  }

  // Si l'utilisateur est connecté et est un client (particulier, stagiaire, ou partenaire)
  if (user?.type === 'particulier' || user?.type === 'stagiaire' || user?.type === 'partenaire') {
    return <ClientDashboard user={user} />;
  }

  // Si personne n'est connecté, afficher la page d'accueil publique
  return <PublicLandingPage />;
}