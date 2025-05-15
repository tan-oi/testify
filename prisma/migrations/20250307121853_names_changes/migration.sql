y/*
  Warnings:

  - You are about to drop the column `spaceAskConsent` on the `SpaceCustomization` table. All the data in the column will be lost.
  - You are about to drop the column `spaceCustomMessage` on the `SpaceCustomization` table. All the data in the column will be lost.
  - You are about to drop the column `spaceHeader` on the `SpaceCustomization` table. All the data in the column will be lost.
  - You are about to drop the column `spaceStarRatings` on the `SpaceCustomization` table. All the data in the column will be lost.
  - You are about to drop the column `spaceThankYouDescription` on the `SpaceCustomization` table. All the data in the column will be lost.
  - You are about to drop the column `spaceThankYouHeader` on the `SpaceCustomization` table. All the data in the column will be lost.
  - You are about to drop the column `spaceVideosAllowed` on the `SpaceCustomization` table. All the data in the column will be lost.
  - You are about to drop the column `textLengthAllowed` on the `SpaceCustomization` table. All the data in the column will be lost.
  - You are about to drop the column `videoLengthAllowed` on the `SpaceCustomization` table. All the data in the column will be lost.
  - Added the required column `allowVideo` to the `SpaceCustomization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headerDescription` to the `SpaceCustomization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headerTitle` to the `SpaceCustomization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textLength` to the `SpaceCustomization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thankYouHeader` to the `SpaceCustomization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thankYouMessage` to the `SpaceCustomization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SpaceCustomization" DROP COLUMN "spaceAskConsent",
DROP COLUMN "spaceCustomMessage",
DROP COLUMN "spaceHeader",
DROP COLUMN "spaceStarRatings",
DROP COLUMN "spaceThankYouDescription",
DROP COLUMN "spaceThankYouHeader",
DROP COLUMN "spaceVideosAllowed",
DROP COLUMN "textLengthAllowed",
DROP COLUMN "videoLengthAllowed",
ADD COLUMN     "allowShare" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allowStarRatings" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allowVideo" BOOLEAN NOT NULL,
ADD COLUMN     "askConsent" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "headerDescription" TEXT NOT NULL,
ADD COLUMN     "headerTitle" TEXT NOT NULL,
ADD COLUMN     "textLength" INTEGER NOT NULL,
ADD COLUMN     "thankYouHeader" TEXT NOT NULL,
ADD COLUMN     "thankYouMessage" TEXT NOT NULL,
ADD COLUMN     "videoLength" INTEGER;
