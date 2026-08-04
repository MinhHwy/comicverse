import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://comicverse.io.vn";

  const comics = await prisma.comic.findMany({
    select: {
      slug: true,
    },
  });

  const chapters = await prisma.chapter.findMany({
    select: {
      chapterNumber: true,
      comic: {
        select: {
          slug: true,
        },
      },
    },
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },

    ...comics.map((comic) => ({
      url: `${baseUrl}/comic/${comic.slug}`,
      lastModified: new Date(),
    })),

    ...chapters.map((chapter) => ({
      url: `${baseUrl}/comic/${chapter.comic.slug}/chapter/${chapter.chapterNumber}`,
      lastModified: new Date(),
    })),
  ];
}