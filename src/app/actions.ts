"use server";

import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";

import prisma from "@/lib/db";

import { authOptions } from "./api/auth/[...nextauth]/options";

export const createShortUrl = async (url: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user.email || !session.user.urlLimit) permanentRedirect("/api/auth/signin");

  const userUrls = await prisma.shortUrl.findFirst({
    where: { AND: [{ email: { equals: session.user.email } }, { longUrl: { equals: url } }] },
  });

  if (userUrls) return userUrls.shortUrl;

  const encodedUrl = btoa(url);
  const shortUrl = encodedUrl.slice(-5);

  const [_updatedUser, createdUrl] = await Promise.all([
    prisma.userLimit.update({
      data: { limit: session.user.urlLimit - 1 },
      where: { email: session.user.email },
    }),
    prisma.shortUrl.create({
      data: { email: session.user.email, longUrl: url, shortUrl: process.env.BASE_PATH + shortUrl },
    }),
  ]);

  return createdUrl.shortUrl;
};
