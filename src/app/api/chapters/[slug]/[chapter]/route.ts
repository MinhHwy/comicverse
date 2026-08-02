import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// import { PrismaClient } from "@prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";

interface RouteParams {
  params: Promise<{
    slug: string;
    chapter: string;
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
    const { slug, chapter } = await params;

    const chapterNumber = Number(chapter);

    if (Number.isNaN(chapterNumber)) {
      return NextResponse.json(
        {
          message: "Chapter không hợp lệ.",
        },
        {
          status: 400,
        }
      );
    }

    const chapterData = await prisma.chapter.findFirst({
      where: {
        chapterNumber,
        comic: {
          slug,
        },
      },
      include: {
        comic: true,
        images: {
          orderBy: {
            pageNumber: "asc",
          },
        },
      },
    });

    if (!chapterData) {
      return NextResponse.json(
        {
          message: "Không tìm thấy chương.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      slug,
      chapter: chapterData.chapterNumber,
      title: chapterData.title,
      views: chapterData.views,
      images: chapterData.images.map(
        (image) => image.imageUrl
      ),
    });
  } catch (error) {
    console.error(
      "Get chapter from database error:",
      error
    );

    return NextResponse.json(
      {
        message: "Có lỗi xảy ra.",
      },
      {
        status: 500,
      }
    );
  }
}