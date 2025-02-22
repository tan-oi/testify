
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log(NextRequest);
  return NextResponse.json({
    message: "hello",
  });
}
