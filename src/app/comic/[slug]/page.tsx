import { notFound } from "next/navigation";

import ComicHeader from "@/components/comic/detail/ComicHeader";
import ComicDescription from "@/components/comic/detail/ComicDescription";
import ComicActions from "@/components/comic/detail/ComicActions";
import ChapterList from "@/components/comic/detail/ChapterList";

interface PageProps {
  params: Promise<{
    slug: string;
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

interface ChapterResponse {
  id: number;
  comicSlug: string;
  chapter: number;
  title: string;
  views: number;
}

export default async function ComicDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

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
  // LẤY CHAPTER TỪ DATABASE
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

  const comicChapters: ChapterResponse[] =
    await chaptersResponse.json();

  // Sắp xếp chapter mới nhất lên trước
  comicChapters.sort(
    (a, b) => b.chapter - a.chapter
  );
 // Lấy chapter mới nhất
  const latestChapter =
  comicChapters.length > 0
    ? comicChapters[0].chapter
    : 1;

  // =========================
  // GIAO DIỆN
  // =========================

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <ComicHeader
  comic={{
    ...comic,
    chapterCount: comicChapters.length,
  }}
/>

      <ComicActions
  slug={comic.slug}
  latestChapter={latestChapter}
/>
      

      <ComicDescription
        description={comic.description}
      />

      <ChapterList
        slug={comic.slug}
        chapters={comicChapters}
      />

    </div>
  );
}