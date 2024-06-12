import { DefaultSession } from "next-auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      urlLimit: number;
    } & DefaultSession["user"];
  }
}
