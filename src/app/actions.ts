"use server";

import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";

import prisma from "@/lib/db";

import { authOptions } from "./api/auth/[...nextauth]/options";

const generateBase62 = async () => {
  const hashString = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  while (true) {
    let hashValue = "";

    for (let i = 0; i < 7; i++) {
      const random = Math.floor(Math.random() * 62);
      hashValue = hashValue + hashString.charAt(random);
    }

    const urlData = await prisma.shortUrl.findUnique({ where: { shortUrl: hashValue } });

    if (!urlData) {
      return hashValue;
    }
  }
};

export const createShortUrl = async (url: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user.email) permanentRedirect("/api/auth/signin");

  const userUrls = await prisma.shortUrl.findFirst({
    where: {
      AND: [{ user: { email: { equals: session.user.email } } }, { longUrl: { equals: url } }],
    },
  });

  if (userUrls) return userUrls.shortUrl;

  const encodedUrl = await generateBase62();

  const createdUrl = await prisma.shortUrl.create({
    data: {
      user: { connect: { email: session.user.email } },
      longUrl: url,
      shortUrl: process.env.BASE_PATH + encodedUrl,
    },
  });

  return createdUrl.shortUrl;
};
