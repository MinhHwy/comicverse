import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// import { PrismaClient } from "@prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

// const connectionString = process.env.DATABASE_URL;

// if (!connectionString) {
//   throw new Error("DATABASE_URL chưa được load");
// }

// const url = new URL(connectionString);

// const adapter = new PrismaMariaDb({
//   host: url.hostname,
//   port: Number(url.port) || 3306,
//   user: decodeURIComponent(url.username),
//   password: decodeURIComponent(url.password),
//   database: url.pathname.replace("/", ""),
// });

// const prisma = new PrismaClient({
//   adapter,
// });

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;

    const comic = await prisma.comic.findUnique({
      where: {
        slug,
      },
    });

    if (!comic) {
      return NextResponse.json(
        {
          message: "Không tìm thấy truyện.",
        },
        {
          status: 404,
        }
      );
    }

    const chapters = await prisma.chapter.findMany({
      where: {
        comicId: comic.id,
      },
      orderBy: {
        chapterNumber: "asc",
      },
      select: {
        id: true,
        chapterNumber: true,
        title: true,
        views: true,
      },
    });

   type ChapterItem = (typeof chapters)[number];

return NextResponse.json(
  chapters.map((chapter: ChapterItem) => ({
    id: chapter.id,
    comicSlug: slug,
    chapter: chapter.chapterNumber,
    title: chapter.title,
    views: chapter.views,
      }))
    );
  } catch (error) {
    console.error(
      "Get comic chapters error:",
      error
    );

    return NextResponse.json(
      {
        message: "Có lỗi xảy ra khi lấy danh sách chapter.",
      },
      {
        status: 500,
      }
    );
  }
  // } finally {
  //   await prisma.$disconnect();
  // }
}