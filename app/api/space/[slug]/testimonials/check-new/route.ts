
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
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
    const { searchParams } = new URL(req.url);
    const afterTimestamp = searchParams.get("afterTimestamp");
    const type = searchParams.get("type") as "TEXT" | "VIDEO";

    if (!afterTimestamp || !type) {
      return NextResponse.json({
        success: false,
        error: "Missing required parameters",
      });
    }

    const session = await auth();
    if (!session || !session?.user) return redirect("/auth");

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
        success: false,
        error: "Space does not exist",
      });
    }

    const count = await prisma.testimonials.count({
      where: {
        spaceId: spaceExists.id,
        type: type,
        createdAt: {
          gt: new Date(afterTimestamp),
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        count,
      },
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "Failed to check for new testimonials",
    });
  }
}