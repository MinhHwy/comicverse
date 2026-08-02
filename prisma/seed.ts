import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import fs from "fs/promises";
import path from "path";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL chưa được load từ .env");
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

const comics = [
  {
    slug: "trang-quynh",
    title: "Trạng Quỳnh",
    alternativeTitle: "",
    author: "Kim Khánh",
    artist: "Kim Khánh",
    description:
      "Bộ truyện tranh dân gian nổi tiếng của Việt Nam kể về Trạng Quỳnh – một nhân vật thông minh, hóm hỉnh và luôn dùng trí tuệ để đối đáp với vua quan, địa chủ và những kẻ tham lam. Đây là một trong những bộ truyện gắn liền với tuổi thơ của nhiều thế hệ độc giả Việt Nam.",
    cover: "/covers/trang-quynh.jpg",
    banner: "/covers/trang-quynh.jpg",
    status: "Hoàn thành",
    views: 1250000,
    followers: 12000,
    rating: 4.9,
    publishedYear: 2003,
  },

  {
    slug: "than-dong-dat-viet",
    title: "Thần Đồng Đất Việt",
    alternativeTitle: "",
    author: "Lê Linh",
    artist: "Lê Linh",
    description:
      "Thần Đồng Đất Việt kể về bốn người bạn Trạng Tí, Sửu Ẹo, Dần Béo và Cả Mẹo. Bộ truyện tái hiện nhiều câu chuyện dân gian, lịch sử và văn hóa Việt Nam thông qua những chuyến phiêu lưu hài hước và đầy sáng tạo.",
    cover: "/covers/than-dong-dat-viet.jpg",
    banner: "/covers/than-dong-dat-viet.jpg",
    status: "Hoàn thành",
    views: 3520000,
    followers: 35600,
    rating: 5.0,
    publishedYear: 2002,
  },

  {
    slug: "trang-quynh-nhi",
    title: "Trạng Quỷnh",
    alternativeTitle: "",
    author: "Kim Khánh",
    artist: "Kim Khánh",
    description:
      "Trạng Quỷnh là bộ truyện hài lấy cảm hứng từ Trạng Quỳnh nhưng được xây dựng theo phong cách hiện đại hơn với nhiều tình huống vui nhộn, gần gũi và mang tính giải trí cao dành cho thiếu nhi.",
    cover: "/covers/trang-quynh-nhi.jpg",
    banner: "/covers/trang-quynh-nhi.jpg",
    status: "Đang cập nhật",
    views: 1980000,
    followers: 18400,
    rating: 4.8,
    publishedYear: 2010,
  },
];

const chapters = [
  {
    comicSlug: "trang-quynh",
    chapterNumber: 1,
    title: "Sao sáng xứ Thanh",
    views: 15230,
  },

  {
    comicSlug: "trang-quynh",
    chapterNumber: 2,
    title: "Đất nứt con bọ hung",
    views: 14890,
  },

  {
    comicSlug: "trang-quynh",
    chapterNumber: 3,
    title: "Cúng thành hoàng",
    views: 13200,
  },

  {
    comicSlug: "than-dong-dat-viet",
    chapterNumber: 1,
    title: "Pháp sư gọi bưởi",
    views: 21400,
  },

  {
    comicSlug: "than-dong-dat-viet",
    chapterNumber: 2,
    title: "Trí nhớ siêu phàm",
    views: 19800,
  },

  {
    comicSlug: "trang-quynh-nhi",
    chapterNumber: 25,
    title: "Trạng chữa bệnh",
    views: 9100,
  },
];

async function main() {
  console.log("Bắt đầu seed database...");

  // =========================
  // SEED COMICS
  // =========================

  for (const comic of comics) {
    await prisma.comic.create({
      data: {
        slug: comic.slug,
        title: comic.title,
        alternativeTitle: comic.alternativeTitle || null,
        author: comic.author,
        artist: comic.artist,
        description: comic.description,
        cover: comic.cover,
        banner: comic.banner,
        status: comic.status,
        views: comic.views,
        followers: comic.followers,
        rating: comic.rating,
        publishedYear: comic.publishedYear,
      },
    });

    console.log(`✓ Comic: ${comic.title}`);
  }

  // =========================
  // SEED CHAPTERS
  // =========================

  for (const chapter of chapters) {
    const comic = await prisma.comic.findUnique({
      where: {
        slug: chapter.comicSlug,
      },
    });

    if (!comic) {
      console.log(
        `Không tìm thấy comic: ${chapter.comicSlug}`
      );

      continue;
    }

    const createdChapter = await prisma.chapter.create({
      data: {
        comicId: comic.id,
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        views: chapter.views,
      },
    });

    console.log(
      `✓ Chapter: ${comic.title} - Tập ${chapter.chapterNumber}`
    );

    // =========================
    // SEED CHAPTER IMAGES
    // =========================

    const chapterDir = path.join(
      process.cwd(),
      "public",
      "comics",
      comic.slug,
      `chapter-${chapter.chapterNumber}`
    );

    try {
      const files = await fs.readdir(chapterDir);

      const imageFiles = files
        .filter((file) =>
          /\.(jpg|jpeg|png|webp)$/i.test(file)
        )
        .sort((a, b) =>
          a.localeCompare(b, undefined, {
            numeric: true,
          })
        );

      for (let i = 0; i < imageFiles.length; i++) {
        await prisma.chapterImage.create({
          data: {
            chapterId: createdChapter.id,
            imageUrl: `/comics/${comic.slug}/chapter-${chapter.chapterNumber}/${imageFiles[i]}`,
            pageNumber: i + 1,
          },
        });
      }

      console.log(
        `  → Đã thêm ${imageFiles.length} ảnh`
      );
    } catch {
      console.log(
        `  → Không tìm thấy thư mục ảnh: ${comic.slug}/chapter-${chapter.chapterNumber}`
      );
    }
  }

  console.log("Seed database thành công!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });