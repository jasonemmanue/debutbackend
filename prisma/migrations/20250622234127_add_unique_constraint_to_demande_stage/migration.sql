/*
  Warnings:

  - A unique constraint covering the columns `[stageId,stagiaireId]` on the table `DemandeStage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "DemandeStage" DROP CONSTRAINT "DemandeStage_stageId_fkey";

-- DropForeignKey
ALTER TABLE "DemandeStage" DROP CONSTRAINT "DemandeStage_stagiaireId_fkey";

-- AlterTable
ALTER TABLE "DemandeStage" ADD COLUMN     "cv_path" TEXT,
ADD COLUMN     "lettre_motivation" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "DemandeStage_stageId_stagiaireId_key" ON "DemandeStage"("stageId", "stagiaireId");

-- AddForeignKey
ALTER TABLE "DemandeStage" ADD CONSTRAINT "DemandeStage_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DemandeStage" ADD CONSTRAINT "DemandeStage_stagiaireId_fkey" FOREIGN KEY ("stagiaireId") REFERENCES "Stagiaire"("id") ON DELETE CASCADE ON UPDATE CASCADE;
