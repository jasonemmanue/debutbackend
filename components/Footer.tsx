import { Building2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">B2B Connect</span>
            </div>
            <p className="text-gray-400">Le réseau d'affaires de référence pour connecter les entreprises d'excellence.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-rose-400">Entreprises</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">S'inscrire</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-rose-400">Clients</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Rechercher</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Secteurs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Actualités</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-rose-400">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Aide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 B2B Connect. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}