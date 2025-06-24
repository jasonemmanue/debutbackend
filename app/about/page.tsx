"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import Link from "next/link"

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 text-gray-800">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            💡 À propos
          </Badge>
          <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
            <span className="font-normal">À Propos de Nous</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto font-light opacity-90">
            Une équipe dynamique au service de la promotion de votre entreprise.
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-20 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Texte */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">Notre Mission</h2>
            <p className="text-lg text-gray-600">
              Notre business book s’adresse à tous ceux qui veulent élargir leur réseau professionnel et apprendre plus sur des entreprises. Nous mettons en lumière les entreprises, des plus petites (PME) aux plus grandes (multinationales). Nous vous connectons avec des gens qui partagent les mêmes valeurs et ambitions que vous.
            </p>
            <p className="text-lg text-gray-600">
              Nous sommes un groupe d'étudiants de 3ème année en Génie Informatique qui avons réalisé ce site dans le cadre de l'unité d'enseignement "Introduction aux réseaux". Ceci est une version Bêta non déployée encore.
            </p>

            {/* Signature */}
            <div className="space-y-4 pt-6">
                <h3 className="text-xl font-semibold text-gray-700">L'Équipe</h3>
                 <p><span className="font-semibold text-gray-800">WOKMENI RAISSA</span> - <span className="text-sm text-gray-500">Développeur Front-End</span></p>
                 <p><span className="font-semibold text-gray-800">SAKAM EMMANUEL</span> - <span className="text-sm text-gray-500">Développeur Back-End</span></p>
                 <p><span className="font-semibold text-gray-800">TOMO ANGELA</span> - <span className="text-sm text-gray-500">Développeur Front-End</span></p>
                 <p><span className="font-semibold text-gray-800">NJIKI MIGUEL</span> - <span className="text-sm text-gray-500">Développeur Front-End</span></p>
                 <p><span className="font-semibold text-gray-800">PAFE PARSIVAL</span> - <span className="text-sm text-gray-500">Développeur Back-End</span></p>
            </div>
          </div>

          {/* Image */}
          <div className="w-full">
            <Image
              src="/images/a-propos.jpg"
              alt="Groupe en voyage"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl object-cover w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Call-to-action */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-rose-600 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-light mb-4">
            REJOIGNEZ <span className="font-normal">Notre Réseau</span>
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Inscrivez-vous pour profiter de nos nombreuses opportunités.
          </p>
          <Link href="/auth/register">
            <Button className="bg-white text-rose-600 hover:bg-rose-50 font-semibold px-6 py-3 text-lg rounded-xl">
               S'inscrire maintenant
            </Button>
         </Link>
        </div>
      </section>
    </div>
  )
}