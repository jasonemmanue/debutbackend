-- AlterTable
ALTER TABLE "Stage" ADD COLUMN     "duree_stage" TEXT,
ADD COLUMN     "niveau_etude_requis" TEXT,
ADD COLUMN     "remunere" BOOLEAN NOT NULL DEFAULT false;
