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

export async function POST(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { slug, chapter } = await params;

    const chapterNumber = Number(chapter);

    // =========================
    // Kiểm tra chapter
    // =========================

    if (
      !Number.isInteger(chapterNumber) ||
      chapterNumber < 1
    ) {
      return NextResponse.json(
        {
          message: "Chapter không hợp lệ.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // Tìm chapter trong Database
    // =========================

    const chapterData =
      await prisma.chapter.findFirst({
        where: {
          chapterNumber,
          comic: {
            slug,
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

    // =========================
    // Tăng views bằng Transaction
    // =========================

    const result = await prisma.$transaction(
      async (tx) => {
        // Tăng lượt xem chapter
        const updatedChapter =
          await tx.chapter.update({
            where: {
              id: chapterData.id,
            },
            data: {
              views: {
                increment: 1,
              },
            },
          });

        // Tăng lượt xem comic
        const updatedComic =
          await tx.comic.update({
            where: {
              id: chapterData.comicId,
            },
            data: {
              views: {
                increment: 1,
              },
            },
          });

        return {
          chapterViews: updatedChapter.views,
          comicViews: updatedComic.views,
        };
      }
    );

    // =========================
    // Trả kết quả
    // =========================

    return NextResponse.json({
      message: "Đã tăng lượt xem.",
      chapterViews: result.chapterViews,
      comicViews: result.comicViews,
    });

  } catch (error) {
    console.error(
      "View API error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Có lỗi xảy ra khi cập nhật lượt xem.",
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