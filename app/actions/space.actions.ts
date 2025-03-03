
"use server";
import { auth } from "@/auth";
import { generateUniqueSlug } from "@/lib/generateSlug";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const fullSchema = z.object({
  name: z.string().min(1, "Space name is required"),
  headerTitle: z.string().min(1, "Header title is required"),
  headerDescription: z.string().min(1, "Header description is required"),
  askConsent: z.boolean().default(false),
  allowVideo: z.boolean().default(false),
  allowStarRatings: z.boolean().default(true),
  thankYouHeader: z.string().min(1, "Thank you header is required"),
  thankYouMessage: z.string().min(1, "Thank you message is required"),
  allowShare: z.boolean().default(false),
  textLength: z.number().int().positive("Text length must be positive"),
  videoLength: z.number().int().nullable()
});

export async function createSpace(data: unknown) {
  try {
    const session = await auth();
    
    const parsedData = fullSchema.safeParse(data);
    console.log(parsedData);
    
    if (!parsedData.success) {
      console.log(parsedData.error.stack, "error is");
      return { 
        success: false, 
        error: "Invalid form data", 
        issues: parsedData.error.format() 
      };
    }
    
    const formData = parsedData.data;
    if(!session || !session?.user) {
      
     redirect("/auth");
    }

    const slugName = await generateUniqueSlug(formData.name);
    console.log("slug", slugName);

    const spaceDetails = await prisma.$transaction(async (tx) => {
      const createSpace = await tx.space.create({
        data: {
          name: formData.name as string,
          slug: slugName as string, 
          userId: session?.user?.id as string
        }
      });
      console.log(createSpace, "space created");

      const spaceCustomization = await tx.spaceCustomization.create({
        data: {
          spaceId: createSpace.id,
          spaceHeader: formData.headerTitle,
          spaceCustomMessage: formData.headerDescription,
          spaceVideosAllowed: formData.allowVideo,
          spaceStarRatings: formData.allowStarRatings,
          spaceThankYouHeader: formData.thankYouHeader,
          spaceThankYouDescription: formData.thankYouMessage,
          spaceAskConsent: formData.askConsent,
          textLengthAllowed: formData.textLength,
          shareAllowed: formData.allowShare,
          ...(formData.videoLength !== null && {
            videoLengthAllowed: formData.videoLength
          })
        }
      });

      console.log(spaceCustomization, "spacecustomization details");

      return {createSpace};
    });
    
    return { 
      success: true, 
      spaceId: spaceDetails.createSpace.id,
      spaceSlug: spaceDetails.createSpace.slug,
      message: "Space created successfully!" 
    };
  } 
  catch(error) {
  
    return {
      success: false,
      error: error
    };
  }
}