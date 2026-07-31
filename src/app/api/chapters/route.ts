import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "data",
  "chapters.json"
);

export async function GET() {
  const file = await fs.readFile(filePath, "utf-8");

  const chapters = JSON.parse(file);

  return NextResponse.json(chapters);
}

export async function POST(request: Request) {
  const body = await request.json();

  const file = await fs.readFile(filePath, "utf-8");

  const chapters = JSON.parse(file);

  const newChapter = {
    id: Date.now(),
    comicSlug: body.comicSlug,
    chapter: Number(body.chapter),
    title: body.title,
    views: 0,
  };

  chapters.push(newChapter);

  await fs.writeFile(
    filePath,
    JSON.stringify(chapters, null, 2),
    "utf-8"
  );

  return NextResponse.json(newChapter, {
    status: 201,
  });
}