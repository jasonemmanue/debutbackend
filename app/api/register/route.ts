import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Vérification basique des données reçues
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Données d'inscription manquantes." },
        { status: 400 },
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: "Un compte avec cet email existe déjà." },
        { status: 409 }, // 409 Conflict
      );
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur dans la base de données
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        mot_de_passe: hashedPassword,
      },
    });

    // Ne jamais renvoyer le mot de passe, même haché
    const { mot_de_passe, ...userWithoutPassword } = newUser;

    return NextResponse.json(
        { message: "Utilisateur créé avec succès.", user: userWithoutPassword },
        { status: 201 } // 201 Created
    );

  } catch (error) {
    // Si une erreur survient (ex: problème de base de données), la capturer
    console.error("ERREUR API INSCRIPTION:", error);
    return NextResponse.json(
      { message: "Une erreur interne est survenue sur le serveur." },
      { status: 500 },
    );
  }
}