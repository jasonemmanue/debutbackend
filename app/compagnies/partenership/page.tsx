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

    // Simulation de l'envoi
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
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                  B2B Connect
                </h1>
                <p className="text-xs text-rose-500/70 font-medium">PARTENARIATS</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-rose-600 transition-colors duration-300 font-medium">
                Accueil
              </Link>
              <Link href="/companies/categories" className="text-gray-600 hover:text-rose-600 transition-colors duration-300 font-medium">
                Catégories
              </Link>
              <Link href="/companies/top" className="text-gray-600 hover:text-rose-600 transition-colors duration-300 font-medium">
                Top Entreprises
              </Link>
              <Link href="/companies/partnership" className="text-rose-600 font-medium">
                Partenariats
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-600 hover:text-rose-600">
                  Se connecter
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white shadow-lg">
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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

      {/* Benefits Section */}
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
              {
                icon: Users,
                title: "Élargir votre réseau",
                description: "Accédez à de nouveaux marchés et clients grâce aux partenaires",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Star,
                title: "Expertise complémentaire",
                description: "Combinez vos compétences pour créer des solutions innovantes",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Handshake,
                title: "Croissance mutuelle",
                description: "Développez votre activité ensemble et partagez les succès",
                color: "from-green-500 to-emerald-500",
              },
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

      {/* Form Section */}
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
                {/* Informations de l'entreprise */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-rose-600" />
                    Informations de votre entreprise
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nom de l'entreprise *</label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        placeholder="Votre entreprise"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Secteur d'activité *</label>
                      <select
                        required
                        value={formData.sector}
                        onChange={(e) => handleInputChange('sector', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Sélectionnez un secteur</option>
                        {sectors.map((sector) => (
                          <option key={sector} value={sector}>{sector}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nombre d'employés *</label>
                      <select
                        required
                        value={formData.employees}
                        onChange={(e) => handleInputChange('employees', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Sélectionnez une taille</option>
                        {employeeRanges.map((range) => (
                          <option key={range} value={range}>{range} employés</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Site web</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        placeholder="https://votre-site.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-rose-600" />
                    Personne de contact
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nom complet *</label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        placeholder="Prénom Nom"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email professionnel *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        placeholder="contact@entreprise.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Téléphone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        placeholder="+33 1 23 45 67 89"
                      />
                    </div>
                  </div>
                </div>

                {/* Partenariat souhaité */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Handshake className="h-5 w-5 mr-2 text-rose-600" />
                    Partenariat souhaité
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Entreprise partenaire souhaitée *</label>
                      <input
                        type="text"
                        required
                        value={formData.partnerCompany}
                        onChange={(e) => handleInputChange('partnerCompany', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        placeholder="Nom de l'entreprise avec qui vous souhaitez vous associer"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Type de partenariat *</label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {partnershipTypes.map((type) => (
                          <div
                            key={type.id}
                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                              formData.partnershipType === type.id
                                ? 'border-rose-500 bg-rose-50'
                                : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50'
                            }`}
                            onClick={() => handleInputChange('partnershipType', type.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="partnershipType"
                                value={type.id}
                                checked={formData.partnershipType === type.id}
                                onChange={() => handleInputChange('partnershipType', type.id)}
                                className="text-rose-600 focus:ring-rose-500"
                              />
                              <div>
                                <h4 className="font-medium text-gray-800">{type.label}</h4>
                                <p className="text-sm text-gray-600">{type.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Détails du projet */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-rose-600" />
                    Détails du projet
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Description du projet *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.projectDescription}
                        onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Décrivez en détail le projet de partenariat, les objectifs et les bénéfices attendus..."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Budget estimé *</label>
                        <select
                          required
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Sélectionnez un budget</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Délai souhaité *</label>
                        <select
                          required
                          value={formData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Sélectionnez un délai</option>
                          <option value="immediate">Immédiat (1 mois)</option>
                          <option value="short\">Court terme (1-3 mois)</option>
                          <option value="medium">Moyen terme (3-6 mois)</option>
                          <option value="long">Long terme (6+ mois)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Objectifs du partenariat *</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.objectives}
                        onChange={(e) => handleInputChange('objectives', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Quels sont vos objectifs principaux pour ce partenariat ?"
                      />
                    </div>
                  </div>
                </div>

                {/* Expérience et références */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-rose-600" />
                    Expérience et références
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Expérience en partenariats</label>
                      <textarea
                        rows={3}
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Décrivez vos expériences précédentes en matière de partenariats..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Références clients</label>
                      <textarea
                        rows={3}
                        value={formData.references}
                        onChange={(e) => handleInputChange('references', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Mentionnez quelques clients ou projets de référence..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Informations complémentaires</label>
                      <textarea
                        rows={3}
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Toute information supplémentaire que vous jugez utile..."
                      />
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-rose-600" />
                    Documents (optionnel)
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-rose-300 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Glissez-déposez vos fichiers ici ou cliquez pour parcourir</p>
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX jusqu'à 10MB</p>
                    <Button variant="outline" className="mt-4 border-rose-300 text-rose-600 hover:bg-rose-50">
                      Choisir des fichiers
                    </Button>
                  </div>
                </div>

                {/* Avertissement */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Information importante</h4>
                      <p className="text-blue-700 text-sm leading-relaxed">
                        Cette demande sera transmise directement à l'entreprise concernée. Assurez-vous que toutes les informations sont exactes et complètes. 
                        Vous recevrez une confirmation par email une fois la demande envoyée.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-semibold text-lg shadow-lg transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Handshake className="h-5 w-5 mr-3" />
                        Envoyer la demande de partenariat
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
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
              {
                question: "Combien de temps faut-il pour obtenir une réponse ?",
                answer: "Les entreprises s'engagent à répondre sous 48h. Vous recevrez une notification dès qu'une réponse sera disponible."
              },
              {
                question: "Puis-je modifier ma demande après l'envoi ?",
                answer: "Oui, contactez notre support dans les 24h suivant l'envoi pour modifier votre demande."
              },
              {
                question: "Y a-t-il des frais pour les demandes de partenariat ?",
                answer: "Non, l'envoi de demandes de partenariat est entièrement gratuit pour tous nos membres."
              },
              {
                question: "Que se passe-t-il si ma demande est refusée ?",
                answer: "Vous recevrez un feedback constructif et pourrez reformuler votre proposition ou cibler d'autres entreprises."
              }
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

      {/* Footer */}
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
              <p className="text-gray-400">
                Le réseau d'affaires de référence pour connecter les entreprises d'excellence
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-rose-400">Partenariats</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/companies/partnership" className="hover:text-white transition-colors">
                    Demande de partenariat
                  </Link>
                </li>
                <li>
                  <Link href="/partnerships/guide" className="hover:text-white transition-colors">
                    Guide des partenariats
                  </Link>
                </li>
                <li>
                  <Link href="/partnerships/success" className="hover:text-white transition-colors">
                    Success stories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-rose-400">Entreprises</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/companies/categories" className="hover:text-white transition-colors">
                    Catégories
                  </Link>
                </li>
                <li>
                  <Link href="/companies/top" className="hover:text-white transition-colors">
                    Top entreprises
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-white transition-colors">
                    S'inscrire
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-rose-400">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Aide
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    CGU
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 B2B Connect. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
