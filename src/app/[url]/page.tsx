import { notFound, permanentRedirect } from "next/navigation";

import prisma from "@/lib/db";

export default async function RedirectToUrl({ params }: { params: { url: string } }) {
  const urlData = await prisma.shortUrl.findUnique({
    where: { shortUrl: process.env.BASE_PATH + params.url },
  });

  if (!urlData) notFound();

  permanentRedirect(urlData.longUrl);
}
