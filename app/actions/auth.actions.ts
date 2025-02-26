"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FormCredTypes } from "@/lib/types";
import bcrypt from "bcryptjs";

export async function googleAuthSubmit() {
  await signIn("google", { redirectTo: "/" });
  return { success: "true" };
}

export async function handleCredentials({
  email,
  password,
  type,
}: FormCredTypes) {
  if (type === "signup") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user)
        return {
          success: false,
          message: "Email already is use, try logging in",
          errorType: "email",
        };

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          email,
          hashedPassword,
        },
      });
    } catch (err) {
      return {
        success: false,
        message: "internal server error,please try again",
        errorType: "root",
      };
    }
  }
  await signIn(
    "credentials",
    { redirectTo: "/dashboard" },
    {
      email,
      password,
    }
  );

  return { success: true };
}
