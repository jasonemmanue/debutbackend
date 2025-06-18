"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Building2, User, ArrowLeft, Briefcase, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [userType, setUserType] = useState<"company" | "client" | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleManualRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Si la réponse n'est pas "ok" (status 2xx), on gère l'erreur
      if (!res.ok) {
        // On vérifie si la réponse est bien du JSON avant de la parser
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Une erreur est survenue.");
        } else {
          // Si ce n'est PAS du JSON, c'est probablement une page d'erreur HTML
          // On affiche une erreur générique et on loggue le détail pour le débogage.
          const errorText = await res.text();
          console.error("Réponse inattendue du serveur (HTML?) :", errorText);
          throw new Error("Le serveur a rencontré une erreur interne. Vérifiez les logs du serveur.");
        }
      }

      // Si l'inscription a réussi, on connecte l'utilisateur
      const signInResponse = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (signInResponse?.error) {
        setError("Inscription réussie, mais la connexion a échoué. Veuillez vous connecter manuellement.");
        router.push("/auth/login");
      } else {
        router.push("/");
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleRegister = () => {
    setIsLoading(true)
    setLoadingProvider("google")
    signIn("google", { callbackUrl: "/" })
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl relative z-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6 text-gray-600 hover:text-rose-600 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour</span>
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
            <p className="text-gray-600">Choisissez votre type de compte pour commencer</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-rose-300 group" onClick={() => setUserType("company")}>
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-rose-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Je suis une Entreprise</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Créez un profil pour votre entreprise, présentez vos services et trouvez de nouveaux clients.</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-300 group" onClick={() => setUserType("client")}>
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-rose-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Je suis un Client</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Explorez notre annuaire, découvrez des prestataires de qualité et gérez vos projets.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <button onClick={() => setUserType(null)} className="inline-flex items-center space-x-2 mb-6 text-gray-600 hover:text-rose-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Changer de type</span>
          </button>
        </div>
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Inscription - {userType === "company" ? "Entreprise" : "Client"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button onClick={handleGoogleRegister} disabled={isLoading} className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-md transition-all duration-300">
              {loadingProvider === "google" ? <Loader2 className="h-5 w-5 animate-spin mr-3" /> : <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>}
              S'inscrire avec Google
            </Button>
            <div className="relative">
              <Separator className="my-6" />
              <div className="absolute inset-0 flex items-center justify-center"><span className="bg-white px-4 text-sm text-gray-500">ou</span></div>
            </div>
            <form onSubmit={handleManualRegister} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{userType === 'company' ? "Nom de l'entreprise" : "Nom complet"}</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder={userType === 'company' ? "Mon Entreprise SAS" : "Jean Dupont"} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300" required/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="votre@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300" required/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mot de passe</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="8+ caractères, 1 majuscule, 1 chiffre" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300" required minLength={8}/>
              </div>
              {error && <div className="bg-red-100 border border-red-300 rounded-xl p-3 text-center"><p className="text-red-700 text-sm">{error}</p></div>}
              <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-semibold shadow-lg transition-all duration-300">
                {isLoading && !loadingProvider ? <Loader2 className="animate-spin" /> : "Créer le compte"}
              </Button>
            </form>
            <div className="text-center pt-4">
              <p className="text-gray-600">Déjà un compte ? <Link href="/auth/login" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors">Se connecter</Link></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}