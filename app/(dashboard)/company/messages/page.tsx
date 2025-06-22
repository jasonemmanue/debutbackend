// app/(dashboard)/company/messages/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import CompanyMessagesClient from "./CompanyMessagesClient";

export default async function CompanyMessagesPage() {
    const session = await auth();
    if (!session?.user) {
        redirect('/auth/login');
    }

    // NOTE : Vous devez créer un modèle 'Message' dans votre schema.prisma
    // pour que cette requête fonctionne. Je simule la structure de données
    // basée sur votre composant `CompanyMessagesPage` de `AUTRESpages.txt`
    const inboxMessages = [
        { id: 1, sender: "Jean Dupont", subject: "Candidature pour le stage", date: "2025-06-15T10:30:00", read: false, type: "application" },
        { id: 2, sender: "Marie Lambert", subject: "Question sur votre événement", date: "2025-06-14T16:45:00", read: true, type: "event" },
    ];
    const sentMessages = [
        { id: 3, recipient: "Jean Dupont", subject: "Re: Candidature", date: "2025-06-15T14:20:00", read: true, type: "application" }
    ];

    const messages = {
        inbox: inboxMessages,
        sent: sentMessages,
        archived: []
    };

    return <CompanyMessagesClient initialMessages={messages} />
}