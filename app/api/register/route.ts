// /app/api/register/route.ts
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    // --- Validation des données ---
    if (!name || !email || !password) {
      return new NextResponse("Les informations (nom, email, mot de passe) sont requises", { status: 400 });
    }
    if (password !== confirmPassword) {
      return new NextResponse("Les mots de passe ne correspondent pas.", { status: 400 });
    }

    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) {
      return new NextResponse("Un utilisateur avec cet email existe déjà.", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // --- Création de l'utilisateur simple ---
    // Le champ 'type' n'est pas défini ici. Il sera null par défaut.
    const user = await prisma.user.create({
      data: {
        name,
        email,
        mot_de_passe: hashedPassword,
      },
    });

    return NextResponse.json(user);

  } catch (error) {
    console.error("ERREUR D'INSCRIPTION:", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}
