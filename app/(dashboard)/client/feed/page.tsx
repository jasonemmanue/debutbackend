// app/(dashboard)/client/feed/page.tsx
"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
// CORRECTION : Ajout de CardHeader et CardTitle à l'import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Search, Calendar, ArrowRight, Heart, Bookmark, Share2, 
  MoreVertical, Plus, FileText, Briefcase, ShoppingCart, 
  MessageSquare, Building2, Star
} from "lucide-react"

export default function NewsFeedPage() {
  const userProfile = {
    avatar: "https://placehold.co/80x80/E0E7FF/3730A3?text=JD",
    name: "Jean Dupont"
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-6 sm:p-8">
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8 space-y-6">
                <Card>
                  <CardContent className="p-4 flex space-x-3">
                    <img src={userProfile.avatar} alt={userProfile.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <Textarea placeholder="Partagez une annonce..." className="mb-2" rows={2}/>
                      <div className="flex justify-end"><Button size="sm">Publier</Button></div>
                    </div>
                  </CardContent>
                </Card>
                {/* ... le reste du contenu du fil d'actualité */}
            </div>
            <div className="col-span-4">
                <Card>
                    <CardHeader><CardTitle>Entreprises à suivre</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {/* Contenu des suggestions */}
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}