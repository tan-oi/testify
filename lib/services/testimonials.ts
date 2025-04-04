import { prisma } from "../prisma";
export async function fetchTextTestimonials({
  limit = 10,
  cursor = null,
  spaceId,
  type
}: {
  limit?: number;
  cursor?: string | null;
  spaceId : string; 
  type : "TEXT" | "VIDEO";
}) {
   
    try {
        console.log(type);
   

  let cursorCreatedAt: Date | undefined;
  let cursorId: string | undefined;
  if (cursor) {
    const [createdAtStr, id] = cursor.split("_");
    cursorCreatedAt = new Date(createdAtStr);
    cursorId = id;
  }

  const items = await prisma.testimonials.findMany({
    take: limit + 1,
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        id: "desc",
      },
    ],
    where: {
    spaceId : spaceId,
      type: type,
    },
    ...(cursor && {
      skip: 1,
      cursor: {
        createdAt: cursorCreatedAt!,
        id: cursorId,
      },
    }),
  });

  const totalFetched = items.length;
  const hasNextPage = totalFetched > limit;

  if (hasNextPage) {
    items.pop();
  }

  const nextCursor =
    hasNextPage && items.length > 0
      ? `${items[items.length - 1].createdAt.toISOString()}_${
          items[items.length - 1].id
        }`
      : null;


      return {
        success : true, 
        data : {
        items,
        nextCursor,
        hasNextPage,
        isExhausted : totalFetched <= limit
      }
    }
}
catch(err) {
    return {
        success : false,
        error : "Failed to fetch"
    }
}
}
