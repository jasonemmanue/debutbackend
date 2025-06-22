-- CreateEnum
CREATE TYPE "TypeAbonne" AS ENUM ('entreprise', 'employe', 'particulier', 'stagiaire', 'partenaire');

-- CreateEnum
CREATE TYPE "StatutDemande" AS ENUM ('en_attente', 'accepte', 'refuse');

-- CreateEnum
CREATE TYPE "StatutParticipation" AS ENUM ('inscrit', 'present', 'absent');

-- CreateEnum
CREATE TYPE "TypeReactionEnum" AS ENUM ('like', 'partage', 'interesse');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "prenom" TEXT,
    "mot_de_passe" TEXT,
    "date_inscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "TypeAbonne",
    

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Entreprise" (
    "id" TEXT NOT NULL,
    "raison_sociale" TEXT,
    "siret" TEXT,
    "secteur_activite" TEXT,
    "adresse" TEXT,
    "telephone" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Entreprise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employe" (
    "id" TEXT NOT NULL,
    "poste" TEXT,
    "competences" TEXT,
    "date_embauche" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "entrepriseId" TEXT NOT NULL,

    CONSTRAINT "Employe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Particulier" (
    "id" TEXT NOT NULL,
    "adresse" TEXT,
    "telephone" TEXT,
    "interets" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Particulier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stagiaire" (
    "id" TEXT NOT NULL,
    "niveau_etudes" TEXT,
    "domaine_etudes" TEXT,
    "competences" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Stagiaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partenaire" (
    "id" TEXT NOT NULL,
    "type_partenariat" TEXT,
    "date_debut_partenariat" TIMESTAMP(3),
    "date_fin_partenariat" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Partenaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evenement" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "date_debut" TIMESTAMP(3),
    "date_fin" TIMESTAMP(3),
    "lieu" TEXT,
    "createurId" TEXT NOT NULL,

    CONSTRAINT "Evenement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestation" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "tarif" DECIMAL(65,30),
    "entrepriseId" TEXT NOT NULL,
    "partenaireId" TEXT,

    CONSTRAINT "Prestation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "date_debut" TIMESTAMP(3),
    "date_fin" TIMESTAMP(3),
    "competences_requises" TEXT,
    "entrepriseId" TEXT NOT NULL,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Annonce" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT,
    "date_publication" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createurId" TEXT NOT NULL,

    CONSTRAINT "Annonce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commentaire" (
    "id" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "annonceId" TEXT NOT NULL,
    "abonneId" TEXT NOT NULL,

    CONSTRAINT "Commentaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DemandeStage" (
    "id" TEXT NOT NULL,
    "date_demande" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut" "StatutDemande" NOT NULL DEFAULT 'en_attente',
    "stageId" TEXT NOT NULL,
    "stagiaireId" TEXT NOT NULL,

    CONSTRAINT "DemandeStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipationEvenement" (
    "id" TEXT NOT NULL,
    "statut" "StatutParticipation" NOT NULL DEFAULT 'inscrit',
    "evenementId" TEXT NOT NULL,
    "abonneId" TEXT NOT NULL,

    CONSTRAINT "ParticipationEvenement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReactionAnnonce" (
    "id" TEXT NOT NULL,
    "type_reaction" "TypeReactionEnum" NOT NULL,
    "date_reaction" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "annonceId" TEXT NOT NULL,
    "abonneId" TEXT NOT NULL,

    CONSTRAINT "ReactionAnnonce_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Entreprise_siret_key" ON "Entreprise"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "Entreprise_userId_key" ON "Entreprise"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Employe_userId_key" ON "Employe"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Particulier_userId_key" ON "Particulier"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Stagiaire_userId_key" ON "Stagiaire"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Partenaire_userId_key" ON "Partenaire"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entreprise" ADD CONSTRAINT "Entreprise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employe" ADD CONSTRAINT "Employe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employe" ADD CONSTRAINT "Employe_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "Entreprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Particulier" ADD CONSTRAINT "Particulier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stagiaire" ADD CONSTRAINT "Stagiaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partenaire" ADD CONSTRAINT "Partenaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evenement" ADD CONSTRAINT "Evenement_createurId_fkey" FOREIGN KEY ("createurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestation" ADD CONSTRAINT "Prestation_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "Entreprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestation" ADD CONSTRAINT "Prestation_partenaireId_fkey" FOREIGN KEY ("partenaireId") REFERENCES "Partenaire"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "Entreprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_createurId_fkey" FOREIGN KEY ("createurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_annonceId_fkey" FOREIGN KEY ("annonceId") REFERENCES "Annonce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_abonneId_fkey" FOREIGN KEY ("abonneId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DemandeStage" ADD CONSTRAINT "DemandeStage_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DemandeStage" ADD CONSTRAINT "DemandeStage_stagiaireId_fkey" FOREIGN KEY ("stagiaireId") REFERENCES "Stagiaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipationEvenement" ADD CONSTRAINT "ParticipationEvenement_evenementId_fkey" FOREIGN KEY ("evenementId") REFERENCES "Evenement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipationEvenement" ADD CONSTRAINT "ParticipationEvenement_abonneId_fkey" FOREIGN KEY ("abonneId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReactionAnnonce" ADD CONSTRAINT "ReactionAnnonce_annonceId_fkey" FOREIGN KEY ("annonceId") REFERENCES "Annonce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReactionAnnonce" ADD CONSTRAINT "ReactionAnnonce_abonneId_fkey" FOREIGN KEY ("abonneId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
