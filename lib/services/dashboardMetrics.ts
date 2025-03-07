import { prisma } from "../prisma";

export async function fetchDashboardOverview(userId : string) {
    const [spaceCount, testimonialCounts] = await Promise.all([
        prisma.space.count({
            where : {userId}
        }),
        prisma.testimonials.groupBy({
            by : ["type"],
            where : {
                space : {
                    userId
                }
            },
            _count : true,
        })
    ]);

    const counts = testimonialCounts.reduce(
        (acc, curr) => {
          acc[curr.type] = curr._count;
          return acc;
        },
        { TEXT: 0, VIDEO: 0 }
      );
    
      return {
        data : {
          spaceCount,
          textTestimonials: counts.TEXT,
          videoTestimonials: counts.VIDEO
        }
       
      }
    
}   


export async function fetchSpaceOverview(userId : string) {
    const spaces = await prisma.space.findMany({
        where: { userId },
        // select: {
        //   id: true,
        //   name: true,
        //   slug: true,
        //   createdAt: true,
        //   updatedAt: true,
        // },
      });
  
      const testimonialCounts = await prisma.testimonials.groupBy({
        by: ["spaceId", "type"],
        where: { space: { userId } },
        _count: true,
      });
  
      type CountMap = Record<string, { text: number; video: number }>;
  
      const countMap: CountMap = testimonialCounts.reduce(
        (acc, { spaceId, type, _count }) => {
          const key = type.toLowerCase() as keyof CountMap[string];
          acc[spaceId] = {
            ...{ text: 0, video: 0 },
            ...acc[spaceId],
            [key]: _count,
          };
          return acc;
        },
        {} as CountMap
      );
  
      const result = spaces.map((space) => ({
        ...space,
        textTestimonials: countMap[space.id]?.text || 0,
        videoTestimonials: countMap[space.id]?.video || 0,
      }));
  
   
    return {
        data : result
    };
}


export async function fetchParticularSpace(slug : string) {
  const spaceData = await prisma.space.findUnique({
    where : {slug},
    select : {spaceCustomization : true, name : true},
    
  })

  console.log(spaceData);
  return {
    spaceData
  }
}