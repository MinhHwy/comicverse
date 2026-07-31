import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface RouteParams {
  params: Promise<{
    slug: string;
    chapter: string;
  }>;
}

interface Chapter {
  id: number;
  comicSlug: string;
  chapter: number;
  title: string;
  views: number;
}

interface Comic {
  id: number;
  slug: string;
  title: string;
  views: number;
}

export async function POST(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { slug, chapter } = await params;

    const chapterNumber = Number(chapter);

    // =========================
    // Đọc chapters.json
    // =========================

    const chaptersPath = path.join(
      process.cwd(),
      "data",
      "chapters.json"
    );

    const chaptersFile = await fs.readFile(
      chaptersPath,
      "utf-8"
    );

    const chapters: Chapter[] =
      JSON.parse(chaptersFile);

    const chapterData = chapters.find(
      (item) =>
        item.comicSlug === slug &&
        item.chapter === chapterNumber
    );

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

    // Tăng lượt xem chương
    chapterData.views += 1;

    // Lưu chapters.json
    await fs.writeFile(
      chaptersPath,
      JSON.stringify(chapters, null, 2),
      "utf-8"
    );

    // =========================
    // Đọc comics.json
    // =========================

    const comicsPath = path.join(
      process.cwd(),
      "data",
      "comics.json"
    );

    let comicViews: number | null = null;

    try {
      const comicsFile = await fs.readFile(
        comicsPath,
        "utf-8"
      );

      const comics: Comic[] =
        JSON.parse(comicsFile);

      const comic = comics.find(
        (item) => item.slug === slug
      );

      if (comic) {
        comic.views += 1;
        comicViews = comic.views;

        await fs.writeFile(
          comicsPath,
          JSON.stringify(comics, null, 2),
          "utf-8"
        );
      }
    } catch {
      console.log(
        "Không tìm thấy comics.json, chỉ cập nhật views chương."
      );
    }

    return NextResponse.json({
      message: "Đã tăng lượt xem.",
      chapterViews: chapterData.views,
      comicViews,
    });
  } catch (error) {
    console.error("View API error:", error);

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