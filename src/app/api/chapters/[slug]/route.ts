import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;

    const filePath = path.join(
      process.cwd(),
      "data",
      "chapters.json"
    );

    const file = await fs.readFile(
      filePath,
      "utf-8"
    );

    const chapters = JSON.parse(file);

    const comicChapters = chapters
      .filter(
        (chapter: { comicSlug: string }) =>
          chapter.comicSlug === slug
      )
      .sort(
        (
          a: { chapter: number },
          b: { chapter: number }
        ) => b.chapter - a.chapter
      );

    return NextResponse.json(comicChapters);
  } catch (error) {
    console.error("Get chapters error:", error);

    return NextResponse.json(
      {
        message: "Không thể lấy danh sách chương.",
      },
      {
        status: 500,
      }
    );
  }
}