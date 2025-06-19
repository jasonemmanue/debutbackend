// /app/api/register/route.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; 
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Données manquantes", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return new NextResponse("Un utilisateur avec cet email existe déjà", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        mot_de_passe: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("ERREUR LORS DE L'INSCRIPTION:", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}