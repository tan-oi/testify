import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { fetchTextTestimonials } from "@/lib/services/testimonials";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
    {
      params,
    }: {
      params: Promise<{
        slug: string;
      }>;
    }) {
        try {
            const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor")
  const typeParam = searchParams.get("type")
  const limit = parseInt(searchParams.get("limit") as string);

          console.log(limit);
 

  const validTypes = ["TEXT", "VIDEO"] as const;
  const type = validTypes.includes(typeParam as any) ? (typeParam as "TEXT" | "VIDEO") : "TEXT"; 

  
       
    const session = await auth();
    if(!session || !session?.user) return redirect("/auth");

    const userId = session?.user?.id;
    const { slug } = await params;

    const spaceExists = await prisma.space.findUnique({
        where: {
          slug: slug,
          userId,
        },
        select: {
          id: true,
        },
      });
  
      if (!spaceExists) {
        return NextResponse.json({
          success: "error",
          error: "Space does not exist",
        });
      }

      const textTestimonials = await fetchTextTestimonials({
        spaceId : spaceExists.id,
        cursor : cursor,
        type : type,
        limit : limit

      })

      return NextResponse.json(textTestimonials) }
      catch(err) {
            NextResponse.json({
                success : false,
                error : "Failed to fetch"
            })
      }

}