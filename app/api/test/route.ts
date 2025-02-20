import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log(NextRequest);
  return NextResponse.json({
    message: "hello",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.age || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const newUser = await db
      .insert(usersTable)
      .values({
        name: body.name,
        age: body.age,
        email: body.email,
      })
      .returning();
      console.log(newUser)
    return NextResponse.json(
      {
        message: "success",
        body,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "eaaha",
    });
  }
}
