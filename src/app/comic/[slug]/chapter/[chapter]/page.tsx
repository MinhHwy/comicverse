import { notFound } from "next/navigation";

import ComicReader from "@/components/comic/reader/ComicReader";
import { pages } from "@/data/pages";

interface PageProps {
  params: Promise<{
    slug: string;
    chapter: string;
  }>;
}

export default async function ReaderPage({
  params,
}: PageProps) {
  const { slug, chapter } = await params;

  const chapterNumber = Number(chapter);

  const images =
    pages[slug as keyof typeof pages]?.[
      chapterNumber as keyof (typeof pages)[keyof typeof pages]
    ];

  if (!images) {
    notFound();
  }

  return (
    <main className="py-8">
      <ComicReader images={images} />
    </main>
  );
}