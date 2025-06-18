"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation simple
    if (!email) {
      setError("Veuillez saisir votre adresse email")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Veuillez saisir une adresse email valide")
      setIsLoading(false)
      return
    }

    try {
      // Simulation de l'envoi d'email
      console.log("Envoi d'email de récupération à:", email)
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulation

      setIsEmailSent(true)
      // Ici vous intégrerez votre logique d'envoi d'email réelle
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error)
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
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

          {!isEmailSent ? (
            <>
              <h2 className="text-3xl font-light text-gray-800 mb-2">Mot de passe oublié ?</h2>
              <p className="text-gray-600">
                Pas de problème ! Saisissez votre email et nous vous enverrons un lien pour réinitialiser votre mot de
                passe.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-light text-gray-800 mb-2">Email envoyé !</h2>
              <p className="text-gray-600">
                Vérifiez votre boîte de réception. Nous avons envoyé un lien de récupération à votre adresse email.
              </p>
            </>
          )}
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          {!isEmailSent ? (
            <>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-2 text-rose-600" />
                  Récupération de mot de passe
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Adresse email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        disabled={isLoading}
                      />
                    </div>
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
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Envoyer le lien de récupération
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Vous vous souvenez de votre mot de passe ?{" "}
                    <Link
                      href="/auth/login"
                      className="text-rose-600 hover:text-rose-700 font-semibold transition-colors"
                    >
                      Se connecter
                    </Link>
                  </p>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">Email envoyé avec succès !</h3>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-green-800 text-sm">
                  <strong>Email envoyé à :</strong> {email}
                </p>
              </div>

              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  <strong>Prochaines étapes :</strong>
                </p>
                <ul className="text-left space-y-2">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      1
                    </span>
                    Vérifiez votre boîte de réception (et vos spams)
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      2
                    </span>
                    Cliquez sur le lien dans l'email
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      3
                    </span>
                    Créez votre nouveau mot de passe
                  </li>
                </ul>
              </div>

              <div className="flex flex-col space-y-3 mt-8">
                <Button
                  onClick={() => {
                    setIsEmailSent(false)
                    setEmail("")
                    setError("")
                  }}
                  variant="outline"
                  className="border-rose-300 text-rose-600 hover:bg-rose-50"
                >
                  Renvoyer l'email
                </Button>

                <Link href="/auth/login">
                  <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white">
                    Retour à la connexion
                  </Button>
                </Link>
              </div>
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
