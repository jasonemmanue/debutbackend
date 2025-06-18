"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Lock, ArrowLeft, CheckCircle, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordReset, setIsPasswordReset] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [token, setToken] = useState("")

  const searchParams = useSearchParams()

  useEffect(() => {
    // Récupérer le token depuis l'URL
    const tokenFromUrl = searchParams.get("token")
    if (tokenFromUrl) {
      setToken(tokenFromUrl)
    }
  }, [searchParams])

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Le mot de passe doit contenir au moins 8 caractères"
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Le mot de passe doit contenir au moins une minuscule"
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Le mot de passe doit contenir au moins une majuscule"
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Le mot de passe doit contenir au moins un chiffre"
    }
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validations
    if (!password || !confirmPassword) {
      setError("Veuillez remplir tous les champs")
      setIsLoading(false)
      return
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      return
    }

    if (!token) {
      setError("Token de réinitialisation manquant ou invalide")
      setIsLoading(false)
      return
    }

    try {
      // Simulation de la réinitialisation
      console.log("Réinitialisation du mot de passe avec token:", token)
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulation

      setIsPasswordReset(true)
      // Ici vous intégrerez votre logique de réinitialisation réelle
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error)
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!token && !isPasswordReset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Lien invalide</h3>
            <p className="text-gray-600 mb-6">
              Ce lien de réinitialisation est invalide ou a expiré. Veuillez demander un nouveau lien.
            </p>
            <Link href="/auth/forgot-password">
              <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white">
                Demander un nouveau lien
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23EC4899' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
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

          {!isPasswordReset ? (
            <>
              <h2 className="text-3xl font-light text-gray-800 mb-2">Nouveau mot de passe</h2>
              <p className="text-gray-600">Choisissez un mot de passe sécurisé pour votre compte.</p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-light text-gray-800 mb-2">Mot de passe modifié !</h2>
              <p className="text-gray-600">Votre mot de passe a été mis à jour avec succès.</p>
            </>
          )}
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          {!isPasswordReset ? (
            <>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-center">
                  <Lock className="h-5 w-5 mr-2 text-rose-600" />
                  Réinitialisation du mot de passe
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Exigences du mot de passe :</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li className={`flex items-center ${password.length >= 8 ? "text-green-600" : ""}`}>
                        <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                        Au moins 8 caractères
                      </li>
                      <li className={`flex items-center ${/(?=.*[a-z])/.test(password) ? "text-green-600" : ""}`}>
                        <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                        Une lettre minuscule
                      </li>
                      <li className={`flex items-center ${/(?=.*[A-Z])/.test(password) ? "text-green-600" : ""}`}>
                        <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                        Une lettre majuscule
                      </li>
                      <li className={`flex items-center ${/(?=.*\d)/.test(password) ? "text-green-600" : ""}`}>
                        <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                        Un chiffre
                      </li>
                    </ul>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-semibold shadow-lg transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Mettre à jour le mot de passe
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">Mot de passe mis à jour !</h3>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-green-800 text-sm">
                  Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec votre nouveau
                  mot de passe.
                </p>
              </div>

              <Link href="/auth/login">
                <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white">
                  Se connecter maintenant
                </Button>
              </Link>
            </CardContent>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Besoin d'aide ?</p>
          <div className="space-x-4 mt-1">
            <Link href="/support" className="hover:text-rose-600 transition-colors">
              Contacter le support
            </Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-rose-600 transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
