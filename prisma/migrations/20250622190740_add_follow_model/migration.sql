-- CreateTable
CREATE TABLE "followed_companies" (
    "userId" TEXT NOT NULL,
    "entrepriseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "followed_companies_pkey" PRIMARY KEY ("userId","entrepriseId")
);

-- AddForeignKey
ALTER TABLE "followed_companies" ADD CONSTRAINT "followed_companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followed_companies" ADD CONSTRAINT "followed_companies_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "Entreprise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
