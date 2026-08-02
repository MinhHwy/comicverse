import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL chưa được load");
}

const url = new URL(connectionString);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port) || 3306,
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace("/", ""),
});

const prisma = new PrismaClient({
  adapter,
});

// =========================
// GET - Lấy tất cả chapter
// =========================

export async function GET() {
  try {
    const chapters = await prisma.chapter.findMany({
      orderBy: [
        {
          comicId: "asc",
        },
        {
          chapterNumber: "asc",
        },
      ],
      include: {
        comic: true,
      },
    });

    return NextResponse.json(
      chapters.map((chapter) => ({
        id: chapter.id,
        comicSlug: chapter.comic.slug,
        chapter: chapter.chapterNumber,
        title: chapter.title,
        views: chapter.views,
      }))
    );
  } catch (error) {
    console.error(
      "Get chapters error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Có lỗi xảy ra khi lấy danh sách chapter.",
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// =========================
// POST - Tạo chapter
// =========================

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const comicSlug = body.comicSlug;
    const chapter = Number(body.chapter);
    const title = body.title;

    // Kiểm tra dữ liệu
    if (
      typeof comicSlug !== "string" ||
      !comicSlug.trim()
    ) {
      return NextResponse.json(
        {
          message:
            "Thiếu comicSlug.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isInteger(chapter) ||
      chapter < 1
    ) {
      return NextResponse.json(
        {
          message:
            "Số chapter không hợp lệ.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        {
          message:
            "Tên chapter không được để trống.",
        },
        {
          status: 400,
        }
      );
    }

    // Tìm comic
    const comic =
      await prisma.comic.findUnique({
        where: {
          slug: comicSlug,
        },
      });

    if (!comic) {
      return NextResponse.json(
        {
          message:
            "Không tìm thấy bộ truyện.",
        },
        {
          status: 404,
        }
      );
    }

    // Kiểm tra chapter đã tồn tại chưa
    const existingChapter =
      await prisma.chapter.findUnique({
        where: {
          comicId_chapterNumber: {
            comicId: comic.id,
            chapterNumber: chapter,
          },
        },
      });

    if (existingChapter) {
      return NextResponse.json(
        {
          message:
            "Chapter này đã tồn tại.",
        },
        {
          status: 409,
        }
      );
    }

    // Tạo chapter trong Database
    const newChapter =
      await prisma.chapter.create({
        data: {
          comicId: comic.id,
          chapterNumber: chapter,
          title: title.trim(),
          views: 0,
        },
      });

    return NextResponse.json(
      {
        id: newChapter.id,
        comicSlug: comic.slug,
        chapter:
          newChapter.chapterNumber,
        title: newChapter.title,
        views: newChapter.views,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Create chapter error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Có lỗi xảy ra khi tạo chapter.",
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}