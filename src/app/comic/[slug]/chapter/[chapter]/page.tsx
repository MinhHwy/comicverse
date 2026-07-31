
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { comics } from "@/data/comics";
import { chapters } from "@/data/chapters";
import ViewCounter from "@/components/reader/ViewCounter";
import ReaderNavigation from "@/components/reader/ReaderNavigation";

interface PageProps {
  params: Promise<{
    slug: string;
    chapter: string;
  }>;
}

interface ChapterImagesResponse {
  slug: string;
  chapter: number;
  images: string[];
}

export default async function ChapterReaderPage({
  params,
}: PageProps) {
  const { slug, chapter } = await params;

  const chapterNumber = Number(chapter);

  const comic = comics.find(
    (comic) => comic.slug === slug
  );

  if (!comic) {
    notFound();
  }

  const chapterData = chapters.find(
    (item) =>
      item.comicSlug === slug &&
      item.chapter === chapterNumber
  );

  if (!chapterData) {
    notFound();
  }

  const comicChapters = chapters
  .filter((item) => item.comicSlug === slug)
  .sort((a, b) => a.chapter - b.chapter);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

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

  return (
    <main className="min-h-screen bg-gray-100">

      <ViewCounter
  slug={slug}
  chapter={chapterNumber}
/>

      {/* Header */}
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
    Tập {chapterData.chapter}
  </h1>

  <p className="text-sm text-gray-600">
    {chapterData.title}
  </p>

  <p className="text-xs text-gray-400">
    {data.images.length} trang
  </p>
</div>

          <div className="w-20" />

        </div>
      </div>

      {/* Chapter info */}
      <div className="border-b bg-white">
  <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 text-sm text-gray-500">
    <span>
      {comic.title} • Tập {chapterData.chapter}
    </span>

    <span>
      {data.images.length} trang
    </span>
  </div>
</div>

      {/* Reader */}
      <div className="mx-auto max-w-4xl">

        {data.images.map((image, index) => (
          <div
            key={image}
            className="relative w-full bg-white"
          >
            <Image
              src={image}
              alt={`${comic.title} - Tập ${chapterData.chapter} - Trang ${
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

      {/* Bottom navigation
      <div className="mx-auto flex max-w-4xl justify-between px-4 py-10">

        <Link
          href={`/comic/${slug}`}
          className="rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-gray-50"
        >
          ← Danh sách tập
        </Link>

        <Link
          href={`/comic/${slug}`}
          className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Hoàn thành
        </Link>

      </div> */}
      {/* Bottom navigation */}
<ReaderNavigation
  slug={slug}
  currentChapter={chapterNumber}
  chapters={comicChapters}
/>

    </main>
  );
}