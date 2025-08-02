-- CreateTable
CREATE TABLE "TestimonialEmbed" (
    "id" TEXT NOT NULL,
    "testimonialId" TEXT NOT NULL,
    "embedId" TEXT NOT NULL,
    "name" TEXT,
    "wrapperStyles" JSONB NOT NULL,
    "contentStyles" JSONB NOT NULL,
    "template" TEXT NOT NULL DEFAULT 'classic',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestimonialEmbed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestimonialEmbed_embedId_key" ON "TestimonialEmbed"("embedId");

-- CreateIndex
CREATE INDEX "TestimonialEmbed_embedId_idx" ON "TestimonialEmbed"("embedId");

-- CreateIndex
CREATE INDEX "TestimonialEmbed_testimonialId_idx" ON "TestimonialEmbed"("testimonialId");

-- AddForeignKey
ALTER TABLE "TestimonialEmbed" ADD CONSTRAINT "TestimonialEmbed_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "Testimonials"("id") ON DELETE CASCADE ON UPDATE CASCADE; 