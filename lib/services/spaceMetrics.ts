import { prisma } from "../prisma";

export async function getTestimonials(spaceId: string) {
    return await prisma.testimonials.findMany({
      where: {
        spaceId: spaceId
      },
      orderBy: {
        createdAt: 'desc'
      },
      select :
      {
        id: true,
        type: true,
        content: true,
        rating: true,
        senderEmail: true,
        senderName: true,
        consentDisplay : true,
        videoUrl : true,
        createdAt : true
      }
    });
}



 export async function isSpaceValid(spaceSlug: string, userId: string) {
    return await prisma.space.findUnique({
      where: {
        userId: userId,
        slug: spaceSlug
      },
      select: {
        slug : true,
        name : true,
        id : true
      }
    });
  } 

  export async function spaceExists(spaceSlug : string) {
    return await prisma.space.findUnique({
      where : {
        slug : spaceSlug
      }
    })
  }