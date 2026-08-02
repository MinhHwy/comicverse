import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// import { PrismaClient } from "@prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

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

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;

    const comic = await prisma.comic.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        alternativeTitle: true,
        author: true,
        artist: true,
        description: true,
        cover: true,
        banner: true,
        status: true,
        views: true,
        followers: true,
        rating: true,
        publishedYear: true,
      },
    });

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
        message: "Có lỗi xảy ra khi lấy thông tin truyện.",
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