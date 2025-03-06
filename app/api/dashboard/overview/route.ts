import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { fetchDashboardOverview } from "@/lib/services/dashboardMetrics";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthenticated" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const overviewData = await fetchDashboardOverview(userId as string);

    return NextResponse.json(
      {
        message: "Success",
        ...overviewData
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: "Failed to retrieve user statistics",
      },
      { status: 500 }
    );
  }
}
