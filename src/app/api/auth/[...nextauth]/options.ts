import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const userData = await prisma.user.findUnique({
        where: { email: user.email! },
      });

      if (!userData) {
        await prisma.user.create({ data: { email: user.email! } });
      }

      return true;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
