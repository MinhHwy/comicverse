import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ViewCounter from "@/components/reader/ViewCounter";
import ReaderNavigation from "@/components/reader/ReaderNavigation";

interface PageProps {
  params: Promise<{
    slug: string;
    chapter: string;
  }>;
}

interface ComicResponse {
  id: number;
  slug: string;
  title: string;
  alternativeTitle: string | null;
  author: string;
  artist: string;
  description: string;
  cover: string;
  banner: string | null;
  status: string;
  views: number;
  followers: number;
  rating: number | string;
  publishedYear: number;
}

interface ChapterImagesResponse {
  slug: string;
  chapter: number;
  title: string;
  views: number;
  images: string[];
}

interface Chapter {
  id: number;
  comicSlug: string;
  chapter: number;
  title: string;
  views: number;
}

export default async function ChapterReaderPage({
  params,
}: PageProps) {
  const { slug, chapter } = await params;

  const chapterNumber = Number(chapter);

  if (
    !Number.isInteger(chapterNumber) ||
    chapterNumber < 1
  ) {
    notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  // =========================
  // LẤY COMIC TỪ DATABASE
  // =========================

  const comicResponse = await fetch(
    `${baseUrl}/api/comics/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!comicResponse.ok) {
    notFound();
  }

  const comic: ComicResponse =
    await comicResponse.json();

  // =========================
  // LẤY CHAPTER + ẢNH
  // =========================

  const response = await fetch(
    `${baseUrl}/api/chapters/${slug}/${chapter}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    notFound();
  }

  const data: ChapterImagesResponse =
    await response.json();

  // =========================
  // LẤY DANH SÁCH CHAPTER
  // =========================

  const chaptersResponse = await fetch(
    `${baseUrl}/api/comics/${slug}/chapters`,
    {
      cache: "no-store",
    }
  );

  if (!chaptersResponse.ok) {
    notFound();
  }

  const comicChapters: Chapter[] =
    await chaptersResponse.json();

  // Sắp xếp chapter tăng dần
  comicChapters.sort(
    (a, b) => a.chapter - b.chapter
  );

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-gray-100">

      {/* =========================
          VIEW COUNTER
      ========================= */}

      <ViewCounter
        slug={slug}
        chapter={chapterNumber}
      />

      {/* =========================
          HEADER
      ========================= */}

      <div className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">

          <Link
            href={`/comic/${slug}`}
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            ← {comic.title}
          </Link>

          <div className="text-center">

            <h1 className="font-bold">
              Tập {data.chapter}
            </h1>

            <p className="text-sm text-gray-500">
              {data.images.length} trang
            </p>

          </div>

          <div className="w-20" />

        </div>
      </div>

      {/* =========================
          CHAPTER INFO
      ========================= */}

      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 text-sm text-gray-500">

          <span>
            {comic.title} • {data.title}
          </span>

          <span>
            {data.images.length} trang
          </span>

        </div>
      </div>

      {/* =========================
          READER
      ========================= */}

      <div className="mx-auto max-w-4xl">

        {data.images.map((image, index) => (
          <div
            key={image}
            className="relative w-full bg-white"
          >

            <Image
              src={image}
              alt={`${comic.title} - ${data.title} - Trang ${
                index + 1
              }`}
              width={1200}
              height={1800}
              priority={index < 2}
              className="h-auto w-full"
            />

          </div>
        ))}

      </div>

      {/* =========================
          BOTTOM NAVIGATION
      ========================= */}

      <ReaderNavigation
        slug={slug}
        currentChapter={chapterNumber}
        chapters={comicChapters}
      />

    </main>
  );
}