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
    async session({ session }) {
      if (!session.user) return session;

      const email = session.user?.email;

      let userLimit = await prisma.userLimit.findUnique({ where: { email: email! } });

      if (!userLimit) {
        userLimit = await prisma.userLimit.create({ data: { email: email! } });
      }

      session.user.urlLimit = userLimit.limit;

      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
