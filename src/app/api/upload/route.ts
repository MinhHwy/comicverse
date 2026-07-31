import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const comicSlug = formData.get("comicSlug");
    const chapter = formData.get("chapter");
    const files = formData.getAll("files");

    if (
      typeof comicSlug !== "string" ||
      typeof chapter !== "string"
    ) {
      return NextResponse.json(
        {
          message: "Thiếu thông tin bộ truyện hoặc chương.",
        },
        {
          status: 400,
        }
      );
    }

    if (files.length === 0) {
      return NextResponse.json(
        {
          message: "Chưa có ảnh được upload.",
        },
        {
          status: 400,
        }
      );
    }

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "comics",
      comicSlug,
      `chapter-${chapter}`
    );

    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    const uploadedFiles: string[] = [];

    let imageNumber = 1;

    for (const file of files) {
      if (!(file instanceof File)) {
        continue;
      }

      const extension =
        path.extname(file.name).toLowerCase() || ".jpg";

      const fileName = `${String(imageNumber).padStart(
        3,
        "0"
      )}${extension}`;

      const filePath = path.join(
        uploadDir,
        fileName
      );

      const buffer = Buffer.from(
        await file.arrayBuffer()
      );

      await fs.writeFile(filePath, buffer);

      uploadedFiles.push(fileName);

      imageNumber++;
    }

    return NextResponse.json({
      message: "Upload thành công!",
      comicSlug,
      chapter: Number(chapter),
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      {
        message: "Có lỗi xảy ra khi upload.",
      },
      {
        status: 500,
      }
    );
  }
}