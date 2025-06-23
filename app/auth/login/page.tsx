// /app/auth/login/page.tsx

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Building2, Mail, Lock, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [backgroundLoaded, setBackgroundLoaded] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  // Affiche l'erreur de NextAuth si elle est présente dans l'URL
  useEffect(() => {
    const authError = searchParams.get("error");
    if (authError) {
      setError("Email ou mot de passe incorrect. Veuillez réessayer.");
    }
    setBackgroundLoaded(true);
  }, [searchParams]);

  const handleOAuthLogin = (provider: "google" | "linkedin") => {
    setIsLoading(true)
    setLoadingProvider(provider)
    signIn(provider, { callbackUrl })
  }

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingProvider(null);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Important pour gérer l'erreur manuellement
    });

    if (result?.error) {
        setError("Email ou mot de passe incorrect. Veuillez réessayer.");
        setIsLoading(false);
    } else if (result?.url) {
        router.push(result.url);
    } else {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Section gauche - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-rose-600/70 to-purple-600/60 z-10 transition-opacity duration-1000 ${
            backgroundLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <img
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&h=1080&fit=crop"
          alt="Arrière-plan"
          className={`w-full h-full object-cover transition-all duration-1000 transform ${
            backgroundLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
          onLoad={() => setBackgroundLoaded(true)}
        />
        
        {/* Contenu overlay */}
        <div className={`absolute inset-0 z-20 flex items-center justify-center p-12 transition-all duration-1000 delay-500 ${
          backgroundLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Bon retour parmi nous !
            </h2>
            <p className="text-white/90 text-lg max-w-md">
              Connectez-vous pour accéder à votre tableau de bord et découvrir de nouvelles opportunités.
            </p>
            
            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-white/80">Entreprises</div>
              </div>
              <div>
                <div className="text-2xl font-bold">1200+</div>
                <div className="text-sm text-white/80">Opportunités</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section droite - Formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-rose-50 via-white to-purple-50">
        <div className="max-w-md w-full">
          {/* Bouton retour */}
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-rose-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>

          {/* Logo et titre */}
          <div className="text-center mb-8">
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
            <h2 className="text-3xl font-light text-gray-800 mb-2">Bienvenue</h2>
            <p className="text-gray-600">Connectez-vous à votre réseau d'affaires</p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Connexion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button
                  onClick={() => handleOAuthLogin("google")}
                  disabled={isLoading}
                  className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-md transition-all duration-300"
                >
                  {loadingProvider === "google" ? (
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
                  Continuer avec Google
                </Button>
              </div>
              <div className="relative">
                <Separator className="my-6" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">ou</span>
                </div>
              </div>
              <form onSubmit={handleCredentialLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Mot de passe</label>
                    <Link href="/auth/forgot-password" className="text-sm text-rose-600 hover:text-rose-700 transition-colors">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
                
                {error && (
                  <div className="bg-red-100 border border-red-300 rounded-xl p-3 text-center">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <Button 
                  disabled={isLoading} 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-semibold shadow-lg transition-all duration-300"
                >
                  {isLoading && !loadingProvider ? <Loader2 className="animate-spin" /> : "Se connecter"}
                </Button>
              </form>
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Pas encore de compte ?{" "}
                  <Link
                    href="/auth/register"
                    className="text-rose-600 hover:text-rose-700 font-semibold transition-colors"
                  >
                    S'inscrire
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
