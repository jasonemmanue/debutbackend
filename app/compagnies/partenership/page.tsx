"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Handshake, CheckCircle, Star, FileText, Upload, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    sector: "",
    employees: "",
    partnerCompany: "",
    partnershipType: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    objectives: "",
    experience: "",
    references: "",
    additionalInfo: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const partnershipTypes = [
    { id: "commercial", label: "Partenariat Commercial", description: "Collaboration commerciale et distribution" },
    { id: "technical", label: "Partenariat Technique", description: "Développement conjoint et innovation" },
    { id: "strategic", label: "Alliance Stratégique", description: "Partenariat à long terme et investissement" },
    { id: "supplier", label: "Fournisseur Privilégié", description: "Relation fournisseur-client préférentielle" },
    { id: "reseller", label: "Revendeur Agréé", description: "Distribution et revente de produits/services" },
    { id: "joint-venture", label: "Joint-Venture", description: "Création d'une entité commune" },
  ]

  const sectors = [
    "Technologie",
    "Finance",
    "Santé",
    "Énergie",
    "Éducation",
    "Commerce",
    "Industrie",
    "Conseil",
    "Autre",
  ]

  const employeeRanges = [
    "1-10",
    "11-50",
    "51-100",
    "101-500",
    "501-1000",
    "1000+",
  ]

  const budgetRanges = [
    "< 10k€",
    "10k€ - 50k€",
    "50k€ - 100k€",
    "100k€ - 500k€",
    "500k€ - 1M€",
    "> 1M€",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">Demande envoyée avec succès !</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <p className="text-green-800 mb-4">
                <strong>Votre demande de partenariat a été transmise à :</strong>
              </p>
              <p className="text-lg font-semibold text-green-700">{formData.partnerCompany}</p>
            </div>

            <div className="space-y-4 text-left mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Prochaines étapes :</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                  <p className="text-gray-600">L'entreprise recevra votre demande dans les prochaines minutes</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                  <p className="text-gray-600">Vous recevrez une confirmation par email sous 24h</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</span>
                  <p className="text-gray-600">Un premier contact sera établi sous 48h si la demande est acceptée</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <Link href="/">
                <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white">
                  Retour à l'accueil
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full border-rose-300 text-rose-600 hover:bg-rose-50"
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({
                    companyName: "", contactName: "", email: "", phone: "", website: "", sector: "", employees: "",
                    partnerCompany: "", partnershipType: "", projectDescription: "", budget: "", timeline: "",
                    objectives: "", experience: "", references: "", additionalInfo: "",
                  })
                }}
              >
                Nouvelle demande
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      <section className="py-16 px-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            🤝 Demande de partenariat B2B
          </Badge>
          <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
            PARTENARIAT
            <br />
            <span className="font-normal">D'ENTREPRISE</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto font-light opacity-90">
            Créez des alliances stratégiques et développez votre activité grâce à notre réseau d'entreprises partenaires
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-gray-800">
              POURQUOI <span className="font-normal text-rose-600">CRÉER UN PARTENARIAT ?</span>
            </h2>
            <p className="text-lg text-gray-600">Les avantages d'une collaboration réussie</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Élargir votre réseau", description: "Accédez à de nouveaux marchés et clients grâce aux partenaires", color: "from-blue-500 to-cyan-500" },
              { icon: Star, title: "Expertise complémentaire", description: "Combinez vos compétences pour créer des solutions innovantes", color: "from-purple-500 to-pink-500" },
              { icon: Handshake, title: "Croissance mutuelle", description: "Développez votre activité ensemble et partagez les succès", color: "from-green-500 to-emerald-500" },
            ].map((benefit, index) => (
              <Card key={index} className="group text-center hover:shadow-xl transition-all duration-300 border-rose-100 hover:border-rose-300">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-r from-rose-50 to-purple-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-gray-800">
              FORMULAIRE DE <span className="font-normal text-rose-600">DEMANDE</span>
            </h2>
            <p className="text-lg text-gray-600">Remplissez ce formulaire pour initier un partenariat</p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center justify-center">
                <Handshake className="h-6 w-6 mr-3 text-rose-600" />
                Demande de Partenariat
              </CardTitle>
              <p className="text-gray-600 mt-2">Tous les champs marqués d'un * sont obligatoires</p>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* ... (le reste du formulaire reste identique) ... */}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-gray-800">
              QUESTIONS <span className="font-normal text-rose-600">FRÉQUENTES</span>
            </h2>
            <p className="text-lg text-gray-600">Tout ce que vous devez savoir sur les partenariats</p>
          </div>
          <div className="space-y-6">
            {[
              { question: "Combien de temps faut-il pour obtenir une réponse ?", answer: "Les entreprises s'engagent à répondre sous 48h. Vous recevrez une notification dès qu'une réponse sera disponible." },
              { question: "Puis-je modifier ma demande après l'envoi ?", answer: "Oui, contactez notre support dans les 24h suivant l'envoi pour modifier votre demande." },
              { question: "Y a-t-il des frais pour les demandes de partenariat ?", answer: "Non, l'envoi de demandes de partenariat est entièrement gratuit pour tous nos membres." },
              { question: "Que se passe-t-il si ma demande est refusée ?", answer: "Vous recevrez un feedback constructif et pourrez reformuler votre proposition ou cibler d'autres entreprises." }
            ].map((faq, index) => (
              <Card key={index} className="border-rose-100 hover:border-rose-300 transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}