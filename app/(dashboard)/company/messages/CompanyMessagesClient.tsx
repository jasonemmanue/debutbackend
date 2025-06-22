// app/(dashboard)/company/messages/CompanyMessagesClient.tsx
"use client"

import React, { useState } from 'react' // 
import { Button } from "@/components/ui/button" // 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // 
import { Mail, ChevronLeft } from "lucide-react" // 
import { useRouter } from 'next/navigation' // 

interface Message {
  id: number;
  sender?: string;
  recipient?: string;
  subject: string;
  preview?: string;
  date: string;
  read: boolean;
  type: string;
}

interface Messages {
  inbox: Message[];
  sent: Message[];
  archived: Message[];
}

interface CompanyMessagesClientProps {
  initialMessages: Messages;
}

export default function CompanyMessagesClient({ initialMessages }: CompanyMessagesClientProps) {
  const router = useRouter() // 
  const [activeFolder, setActiveFolder] = useState("inbox") // 
  const [messages, setMessages] = useState(initialMessages)

  const formatDate = (dateString: string) => { // 
    return new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="min-h-screen">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ChevronLeft className="h-5 w-5" /> Retour
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Messagerie</h1>
        </div>
        <Card>
            <CardHeader><CardTitle>Boîte de réception</CardTitle></CardHeader>
            <CardContent>
                {messages.inbox.length > 0 ? (
                    messages.inbox.map(message => (
                        <div key={message.id} className="p-4 border-b hover:bg-gray-50">
                            <h3 className={`font-semibold ${!message.read ? 'text-black' : 'text-gray-600'}`}>{message.sender}</h3>
                            <p className="truncate">{message.subject}</p>
                            <p className="text-xs text-gray-500">{formatDate(message.date)}</p>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <Mail className="h-10 w-10 mx-auto mb-4 text-gray-300" />
                        <p>Aucun message</p>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  )
}