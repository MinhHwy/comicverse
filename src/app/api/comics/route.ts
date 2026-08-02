import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// import { PrismaClient } from "@prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";

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

export async function GET() {
  try {
    const comics = await prisma.comic.findMany({
  orderBy: {
    views: "desc",
  },
  include: {
    _count: {
      select: {
        chapters: true,
      },
    },
  },
});

  const result = comics.map((comic) => ({
  ...comic,
  chapterCount: comic._count.chapters,
  _count: undefined,
}));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Get comics error:", error);

    return NextResponse.json(
      {
        message: "Không thể lấy danh sách truyện.",
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