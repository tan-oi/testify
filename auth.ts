import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth",
  },
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),

    // Credentials({
    //   name: "Enter your details",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "Enter a valid email",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "Password",
    //       placeholder: "Enter a valid password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials.email || !credentials.password)
    //       throw new Error("Please enter a valid email and password");

    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: credentials.email as string,
    //       },
    //     });

    //     if (!user) throw new Error("No user found, please create an account");

    //     const isPasswordValid = await bcrypt.compare(
    //       credentials.password as string,
    //       user.hashedPassword as string
    //     );
    //     if (!isPasswordValid)
    //       throw new Error(
    //         "Wrong password, please try again with a new password"
    //       );

    //     return {
    //       id: user.id,
    //       name: user.name,
    //       email: user.email,
    //     };
    //   },
    // }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id as string;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
