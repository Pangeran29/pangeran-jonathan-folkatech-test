/*
  Warnings:

  - Changed the type of `identityNumber` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "identityNumber",
ADD COLUMN     "identityNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_identityNumber_key" ON "User"("identityNumber");
