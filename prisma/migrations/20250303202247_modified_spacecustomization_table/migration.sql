/*
  Warnings:

  - You are about to drop the column `spaceCollectionAllowed` on the `SpaceCustomization` table. All the data in the column will be lost.
  - You are about to drop the column `spaceQuestions` on the `SpaceCustomization` table. All the data in the column will be lost.
  - You are about to drop the column `spaceTheme` on the `SpaceCustomization` table. All the data in the column will be lost.
  - Added the required column `spaceVideosAllowed` to the `SpaceCustomization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textLengthAllowed` to the `SpaceCustomization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" ALTER COLUMN "logo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SpaceCustomization" DROP COLUMN "spaceCollectionAllowed",
DROP COLUMN "spaceQuestions",
DROP COLUMN "spaceTheme",
ADD COLUMN     "spaceAskConsent" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "spaceVideosAllowed" BOOLEAN NOT NULL,
ADD COLUMN     "textLengthAllowed" INTEGER NOT NULL,
ADD COLUMN     "videoLengthAllowed" INTEGER;
