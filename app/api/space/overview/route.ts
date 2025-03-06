import { auth } from "@/auth";
import { NextResponse } from "next/server";

import { fetchSpaceOverview } from "@/lib/services/dashboardMetrics";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
  
   
    const result = await fetchSpaceOverview(userId as string);

  
    return NextResponse.json({...result }, { status: 200 });

   
  } catch (error) {
    console.error("[SPACE_STATS_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
