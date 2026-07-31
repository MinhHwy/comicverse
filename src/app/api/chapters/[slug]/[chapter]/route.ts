import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface RouteParams {
  params: Promise<{
    slug: string;
    chapter: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { slug, chapter } = await params;

    const chapterDir = path.join(
      process.cwd(),
      "public",
      "comics",
      slug,
      `chapter-${chapter}`
    );

    const files = await fs.readdir(chapterDir);

    const imageFiles = files
      .filter((file) =>
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      )
      .sort();

    const images = imageFiles.map(
      (file) =>
        `/comics/${slug}/chapter-${chapter}/${file}`
    );

    return NextResponse.json({
      slug,
      chapter: Number(chapter),
      images,
    });
  } catch (error) {
    console.error("Get chapter images error:", error);

    return NextResponse.json(
      {
        message: "Không tìm thấy ảnh của chương.",
      },
      {
        status: 404,
      }
    );
  }
}