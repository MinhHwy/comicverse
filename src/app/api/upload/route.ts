import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// import { PrismaClient } from "@prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import cloudinary from "@/lib/cloudinary";

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

export async function POST(request: Request) {
  try {
    // =========================
    // Lấy FormData
    // =========================

    const formData = await request.formData();

    const comicSlug = formData.get("comicSlug");
    const chapter = formData.get("chapter");
    const chapterTitle = formData.get("chapterTitle");
    const files = formData.getAll("files");

    // =========================
    // Kiểm tra dữ liệu
    // =========================

    if (
      typeof comicSlug !== "string" ||
      typeof chapter !== "string"
    ) {
      return NextResponse.json(
        {
          message:
            "Thiếu thông tin bộ truyện hoặc chương.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      typeof chapterTitle !== "string" ||
      !chapterTitle.trim()
    ) {
      return NextResponse.json(
        {
          message: "Vui lòng nhập tên chương.",
        },
        {
          status: 400,
        }
      );
    }

    const chapterNumber = Number(chapter);

    if (
      !Number.isInteger(chapterNumber) ||
      chapterNumber < 1
    ) {
      return NextResponse.json(
        {
          message: "Số tập không hợp lệ.",
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

    // =========================
    // Tìm Comic
    // =========================

    const comic = await prisma.comic.findUnique({
      where: {
        slug: comicSlug,
      },
    });

    if (!comic) {
      return NextResponse.json(
        {
          message:
            "Không tìm thấy bộ truyện trong Database.",
        },
        {
          status: 404,
        }
      );
    }

    // =========================
    // Tìm hoặc tạo Chapter
    // =========================

    let chapterRecord =
      await prisma.chapter.findUnique({
        where: {
          comicId_chapterNumber: {
            comicId: comic.id,
            chapterNumber,
          },
        },
      });

    if (!chapterRecord) {
      chapterRecord = await prisma.chapter.create({
        data: {
          comicId: comic.id,
          chapterNumber,
          title: chapterTitle.trim(),
          views: 0,
        },
      });
    } else {
      chapterRecord = await prisma.chapter.update({
        where: {
          id: chapterRecord.id,
        },
        data: {
          title: chapterTitle.trim(),
        },
      });
    }

    // =========================
    // Tìm số trang tiếp theo
    // =========================

    const lastImage =
      await prisma.chapterImage.findFirst({
        where: {
          chapterId: chapterRecord.id,
        },
        orderBy: {
          pageNumber: "desc",
        },
        select: {
          pageNumber: true,
        },
      });

    let imageNumber =
      lastImage
        ? lastImage.pageNumber + 1
        : 1;

    // =========================
    // Danh sách ảnh upload
    // =========================

    const uploadedFiles: string[] = [];

    // =========================
    // Upload từng ảnh
    // =========================

    for (const file of files) {
      if (!(file instanceof File)) {
        continue;
      }

      // Chỉ cho phép ảnh
      if (!file.type.startsWith("image/")) {
        continue;
      }

      // Đọc file
      const buffer = Buffer.from(
        await file.arrayBuffer()
      );

      // =========================
      // Upload Cloudinary
      // =========================

      const result =
        await new Promise<{
          secure_url: string;
          public_id: string;
        }>((resolve, reject) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder: `comicverse/${comicSlug}/chapter-${chapterNumber}`,
                resource_type: "image",
              },
              (error, result) => {
                if (error || !result) {
                  reject(
                    error ||
                      new Error(
                        "Cloudinary upload failed"
                      )
                  );

                  return;
                }

                resolve({
                  secure_url:
                    result.secure_url,
                  public_id:
                    result.public_id,
                });
              }
            );

          uploadStream.end(buffer);
        });

      try {
        // =========================
        // Lưu vào Database
        // =========================

        await prisma.chapterImage.create({
          data: {
            chapterId: chapterRecord.id,
            imageUrl: result.secure_url,
            pageNumber: imageNumber,
          },
        });

        uploadedFiles.push(
          result.secure_url
        );

        imageNumber++;
      } catch (databaseError) {
        // =========================
        // Nếu DB lỗi → xóa ảnh Cloudinary
        // =========================

        console.error(
          "Database save error:",
          databaseError
        );

        try {
          await cloudinary.uploader.destroy(
            result.public_id
          );
        } catch (deleteError) {
          console.error(
            "Cloudinary delete error:",
            deleteError
          );
        }

        throw databaseError;
      }
    }

    // =========================
    // Thành công
    // =========================

    return NextResponse.json({
      message:
        "Upload ảnh lên Cloudinary thành công!",
      comicSlug,
      chapter: chapterNumber,
      chapterId: chapterRecord.id,
      files: uploadedFiles,
    });
  } catch (error) {
    console.error(
      "Cloudinary upload error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Có lỗi xảy ra khi upload ảnh.",
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