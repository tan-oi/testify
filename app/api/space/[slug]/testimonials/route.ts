import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getTestimonials } from "@/lib/services/spaceMetrics";
import { redirect } from "next/navigation";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      slug: string;
    }>;
  }
) {
  try {
    const session = await auth();
    if (!session || !session?.user) {
      return redirect("/auth");
    }

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

    const allTestimonials = await getTestimonials(spaceExists?.id)

    return NextResponse.json(
        {
            success: true,
            message: "Testimonials fetched",
            data: allTestimonials,
          }
    )
    
   
  } catch (err) {
    return NextResponse.json(
        {
            success: false,
            error: "Internal server error, try again",
            
          }
    )
  }
}


