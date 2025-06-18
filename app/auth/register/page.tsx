"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building2, User, ArrowLeft, Briefcase, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react" // Importez la fonction signIn

export default function RegisterPage() {
  const [userType, setUserType] = useState<"company" | "client" | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fonction qui lance la véritable authentification Google
  const handleGoogleRegister = () => {
    setIsLoading(true)
    // On lance la connexion via le fournisseur "google".
    // Après connexion, l'utilisateur sera redirigé vers la page d'accueil.
    // Auth.js s'occupera de créer l'utilisateur dans la base de données s'il n'existe pas.
    signIn("google", { callbackUrl: "/" })
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/auth/login"
              className="inline-flex items-center space-x-2 mb-6 text-gray-600 hover:text-rose-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à la connexion</span>
            </Link>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                  B2B Connect
                </h1>
                <p className="text-xs text-rose-500/70 font-medium">RÉSEAU D'EXCELLENCE</p>
              </div>
            </div>
            <h2 className="text-3xl font-light text-gray-800 mb-2">Rejoignez-nous</h2>
            <p className="text-gray-600">Choisissez votre type de compte</p>
          </div>

          {/* User Type Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-rose-300 group"
              onClick={() => setUserType("company")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-rose-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Entreprise</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Présentez votre entreprise, vos services et connectez-vous avec vos clients potentiels
                </p>
                <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">Inscription gratuite</Badge>
                <ul className="mt-4 text-sm text-gray-600 space-y-2">
                  <li>• Profil entreprise complet</li>
                  <li>• Galerie de produits/services</li>
                  <li>• Messagerie avec clients</li>
                  <li>• Système de rendez-vous</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-300 group"
              onClick={() => setUserType("client")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-rose-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Client</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Découvrez les meilleures entreprises, consultez les actualités et laissez vos avis
                </p>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Accès gratuit</Badge>
                <ul className="mt-4 text-sm text-gray-600 space-y-2">
                  <li>• Recherche avancée</li>
                  <li>• Actualités entreprises</li>
                  <li>• Système de notation</li>
                  <li>• Prise de rendez-vous</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Déjà un compte ?{" "}
              <Link href="/auth/login" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Écran d'inscription une fois le type choisi
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => setUserType(null)}
            className="inline-flex items-center space-x-2 mb-6 text-gray-600 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Changer de type</span>
          </button>

          <div className="flex items-center justify-center space-x-3 mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${userType === "company" ? "from-rose-400 to-purple-500" : "from-purple-400 to-rose-500"} rounded-xl flex items-center justify-center shadow-lg`}
            >
              {userType === "company" ? (
                <Briefcase className="h-7 w-7 text-white" />
              ) : (
                <User className="h-7 w-7 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                B2B Connect
              </h1>
              <p className="text-xs text-rose-500/70 font-medium">
                {userType === "company" ? "INSCRIPTION ENTREPRISE" : "INSCRIPTION CLIENT"}
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-light text-gray-800 mb-2">
            {userType === "company" ? "Votre Entreprise" : "Votre Compte"}
          </h2>
          <p className="text-gray-600">
            {userType === "company" ? "Présentez votre entreprise au réseau" : "Rejoignez notre communauté de clients"}
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">
              {userType === "company" ? "Inscription Entreprise" : "Inscription Client"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OAuth Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleGoogleRegister}
                disabled={isLoading}
                className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-md transition-all duration-300"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-3" />
                ) : (
                  <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                S'inscrire avec Google
              </Button>

              <Button disabled className="w-full h-12 bg-[#0077B5] hover:bg-[#005885] text-white shadow-md transition-all duration-300 opacity-50 cursor-not-allowed">
                <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                S'inscrire avec LinkedIn (bientôt)
              </Button>
            </div>

            <div className="relative">
              <Separator className="my-6" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">ou</span>
              </div>
            </div>

            {/* Registration Form */}
            <form className="space-y-4">
              {userType === "company" ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nom de l'entreprise</label>
                      <input
                        type="text"
                        placeholder="Mon Entreprise"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Secteur</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300">
                        <option>Technologie</option>
                        <option>Finance</option>
                        <option>Santé</option>
                        <option>Éducation</option>
                        <option>Commerce</option>
                        <option>Autre</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email professionnel</label>
                    <input
                      type="email"
                      placeholder="contact@monentreprise.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Prénom</label>
                      <input
                        type="text"
                        placeholder="Jean"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nom</label>
                      <input
                        type="text"
                        placeholder="Dupont"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      placeholder="jean.dupont@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="flex items-start space-x-2">
                <input type="checkbox" id="terms" className="mt-1 rounded border-gray-300 text-rose-600 focus:ring-rose-500" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  J'accepte les{" "}
                  <Link href="/terms" className="text-rose-600 hover:text-rose-700 transition-colors">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="/privacy" className="text-rose-600 hover:text-rose-700 transition-colors">
                    politique de confidentialité
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className={`w-full h-12 bg-gradient-to-r ${userType === "company" ? "from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600" : "from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-600"} text-white font-semibold shadow-lg transition-all duration-300`}
              >
                {userType === "company" ? "Créer mon profil entreprise" : "Créer mon compte"}
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                Déjà un compte ?{" "}
                <Link href="/auth/login" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors">
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
