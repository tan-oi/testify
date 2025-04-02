"use server";
import { auth } from "@/auth";
import { generateUniqueSlug } from "@/lib/generateSlug";
import { prisma } from "@/lib/prisma";
import { fullSchema } from "@/lib/schema";
import { DeleteResponse } from "@/lib/store/spaceStore";
import { SpaceCustomization } from "@prisma/client";
import { redirect } from "next/navigation";


export async function createSpace(data: unknown) {
  try {
    console.log(data);
    const session = await auth();

    const parsedData = fullSchema.safeParse(data);

    if (!parsedData.success) {
      console.log(parsedData.error.stack, "error is");
      return {
        success: false,
        error: "Invalid form data",
        issues: parsedData.error.format(),
      };
    }

    const formData = parsedData.data;
    if (!session || !session?.user) {
      redirect("/auth");
    }
    const lowercaseName = formData.name.toLowerCase();

    const slugName = await generateUniqueSlug(lowercaseName);

    const spaceDetails = await prisma.$transaction(async (tx) => {
      const createSpace = await tx.space.create({
        data: {
          name: lowercaseName as string,
          slug: slugName as string,
          userId: session?.user?.id as string,
        },
      });

      const spaceCustomization = await tx.spaceCustomization.create({
        data: {
          spaceId: createSpace.id,
         
          headerTitle: formData.headerTitle,
          headerDescription: formData.headerDescription,
          allowVideo: formData.allowVideo,
          allowStarRatings: formData.allowStarRatings,
          thankYouHeader: formData.thankYouHeader,
          thankYouMessage: formData.thankYouMessage,
          askConsent: formData.askConsent,
          textLength: formData.textLength,
          allowShare: formData.allowShare,
          ...(formData.videoLength !== null && {
            videoLength: formData.videoLength,
          }),
        },
      });

      console.log(spaceCustomization);
      return { createSpace };
    });
    

    return {
      success: true,
      // spaceId: spaceDetails.createSpace.id,
      spaceSlug: spaceDetails.createSpace.slug,
      message: "Space created successfully!",
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

export async function editSpace(data: Partial<SpaceCustomization>) {
  try {
    const session = await auth();
    if (!data.spaceId) {
      return {
        success: false,
        error: "Internal server error, please try again.",
      };
    }

    if (!session || !session?.user) return redirect("/auth");

    const parsedData = fullSchema.safeParse(data);

    if (!parsedData.success) {
      console.log(parsedData.error.stack, "error is");
      return {
        success: false,
        error: "Invalid form data",
        issues: parsedData.error.format(),
      };
    }

    const formData = parsedData.data;

    const findSpace = await prisma.space.findUnique({
      where: {
        userId: session?.user?.id as string,
        id: data.spaceId,
      },
      select: {
        slug: true,
      },
    });

    console.log(findSpace);
    if (!findSpace) {
      return {
        success: false,
        error: "Unauthenticated",
        statusCode: 404,
      };
    }

    const updatedData = await prisma.spaceCustomization.update({
      where: {
        spaceId: data.spaceId,
      },
      data: {
        headerTitle: formData.headerTitle,
        headerDescription: formData.headerDescription,
        askConsent: formData.askConsent,
        allowShare: formData.allowShare,
        allowStarRatings: formData.allowStarRatings,
        allowVideo: formData.allowVideo,
        thankYouHeader: formData.thankYouHeader,
        thankYouMessage: formData.thankYouMessage,
        textLength: formData.textLength,
        videoLength: formData.videoLength,
      },
    });

    console.log(updatedData, "update done");

    return {
      success: true,
      slug: findSpace,
      message: "Space edited successfully",
    };
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
}


export async function deleteSpace(data : {
  name : string,
  id : string
}): Promise<DeleteResponse> {
  const session = await auth();
  if(!session || !session?.user) return redirect('/auth');
  try {
    
  const user = session?.user?.id;

  const isSpaceValid = await prisma.space.findUnique({
    where : {
      id : data.id
    }
  })

  if(!isSpaceValid) {
    return {
      success : false,
      error : "Space doesn't exist!"
    }
  }


  const deleteValidSpace = await prisma.space.delete({
    where : {
      id : data.id
    }
  })

  if(deleteValidSpace) {

    return {
      success: true,
      message : "Space deleted successfully",
    }
  }

  else {
    return {
      success : false,
      message : "Space wasnt able to get deleted, please try again."
    }
  }
  
  } 
  catch(err) {
    return { 
      success : false,
      error : "Something went wronf dude"
    }
  }
 


}

