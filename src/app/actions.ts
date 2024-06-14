"use server";

import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";

import prisma from "@/lib/db";

import { authOptions } from "./api/auth/[...nextauth]/options";

export const createShortUrl = async (url: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user.email) permanentRedirect("/api/auth/signin");

  const userUrls = await prisma.shortUrl.findFirst({
    where: {
      AND: [{ user: { email: { equals: session.user.email } } }, { longUrl: { equals: url } }],
    },
  });

  if (userUrls) return userUrls.shortUrl;

  const encodedUrl = btoa(url);
  const shortUrl = encodedUrl.slice(-5);

  const createdUrl = await prisma.shortUrl.create({
    data: {
      user: { connect: { email: session.user.email } },
      longUrl: url,
      shortUrl: process.env.BASE_PATH + shortUrl,
    },
  });

  return createdUrl.shortUrl;
};
