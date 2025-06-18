"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Building2, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleOAuthLogin = (provider: "google" | "linkedin") => {
    setIsLoading(true)
    setLoadingProvider(provider)
    // Lance la connexion réelle via NextAuth
    signIn(provider, { callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23EC4899' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 mb-6 text-gray-600 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour à l'accueil</span>
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
              <Button
                onClick={() => handleOAuthLogin("linkedin")}
                disabled={true}
                className="w-full h-12 bg-[#0077B5] hover:bg-[#005885] text-white shadow-md transition-all duration-300 opacity-50 cursor-not-allowed"
              >
                {loadingProvider === "linkedin" ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-3" />
                ) : (
                  <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )}
                Continuer avec LinkedIn (bientôt)
              </Button>
            </div>
            <div className="relative">
              <Separator className="my-6" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">ou</span>
              </div>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300 text-rose-600 focus:ring-rose-500" />
                  <span className="text-gray-600">Se souvenir de moi</span>
                </label>
                <Link href="/auth/forgot-password" className="text-rose-600 hover:text-rose-700 transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>
              <Button className="w-full h-12 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-semibold shadow-lg transition-all duration-300">
                Se connecter
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
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>En vous connectant, vous acceptez nos</p>
          <div className="space-x-4 mt-1">
            <Link href="/terms" className="hover:text-rose-600 transition-colors">
              Conditions d'utilisation
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-rose-600 transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
