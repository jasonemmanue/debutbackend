/*
  Warnings:

  - You are about to drop the column `siret` on the `Entreprise` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `Entreprise` table. All the data in the column will be lost.
  - You are about to drop the column `date_inscription` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterEnum
ALTER TYPE "TypeAbonne" ADD VALUE 'client';

-- DropIndex
DROP INDEX "Entreprise_siret_key";

-- AlterTable
ALTER TABLE "Entreprise" DROP COLUMN "siret",
DROP COLUMN "telephone",
ADD COLUMN     "certifications" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "contacts" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "date_de_creation" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "horaires_ouverture" TEXT,
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "nombre_employes" INTEGER,
ADD COLUMN     "pays" TEXT,
ADD COLUMN     "services_proposes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "site_web" TEXT,
ADD COLUMN     "sites" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "ville" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "date_inscription",
DROP COLUMN "prenom",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
