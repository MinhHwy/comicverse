import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface Comic {
  id: number;
  slug: string;
  title: string;
  views: number;
}

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
      "comics.json"
    );

    const file = await fs.readFile(
      filePath,
      "utf-8"
    );

    const comics: Comic[] = JSON.parse(file);

    const comic = comics.find(
      (item) => item.slug === slug
    );

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

    return NextResponse.json(comic);
  } catch (error) {
    console.error("Get comic error:", error);

    return NextResponse.json(
      {
        message: "Không thể lấy dữ liệu truyện.",
      },
      {
        status: 500,
      }
    );
  }
}