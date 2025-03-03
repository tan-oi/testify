import { prisma } from "./prisma";


export const generateUniqueSlug = async (spaceName:string) => {
    const baseSlug = spaceName.toLowerCase().replace(/\s+/g, "-");
  
    
    const existingSlugs = await prisma.space.findMany({
      where: {
        slug: {
          startsWith: baseSlug,
        },
      },
    });
  
    if (existingSlugs.length === 0) {
      return baseSlug;
    }
  
   
    const numbers = existingSlugs
      .map(doc => doc.slug.match(/-(\d+)$/)?.[1]) 
      .filter(Boolean) 
      .map(Number); 
  
    const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
    return `${baseSlug}-${maxNumber + 1}`;
  };
  