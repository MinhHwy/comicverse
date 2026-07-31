import Link from "next/link";
import { ChevronLeft, ChevronRight, List } from "lucide-react";

interface Chapter {
  chapter: number;
  title: string;
}

interface ReaderNavigationProps {
  slug: string;
  currentChapter: number;
  chapters: Chapter[];
}

export default function ReaderNavigation({
  slug,
  currentChapter,
  chapters,
}: ReaderNavigationProps) {
  const sortedChapters = [...chapters].sort(
    (a, b) => a.chapter - b.chapter
  );

  const currentIndex = sortedChapters.findIndex(
    (chapter) => chapter.chapter === currentChapter
  );

  const previousChapter =
    currentIndex > 0
      ? sortedChapters[currentIndex - 1]
      : null;

  const nextChapter =
    currentIndex >= 0 &&
    currentIndex < sortedChapters.length - 1
      ? sortedChapters[currentIndex + 1]
      : null;

  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-8">

      {/* Tập trước */}
      {previousChapter ? (
        <Link
          href={`/comic/${slug}/chapter/${previousChapter.chapter}`}
          className="flex flex-1 items-center gap-2 rounded-xl border bg-white px-4 py-3 transition hover:bg-orange-50"
        >
          <ChevronLeft size={20} />

          <div>
            <p className="text-xs text-gray-500">
              Tập trước
            </p>

            <p className="font-semibold">
              Tập {previousChapter.chapter}
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {/* Danh sách */}
      <Link
        href={`/comic/${slug}`}
        className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 transition hover:bg-orange-50"
      >
        <List size={20} />

        <span className="font-semibold">
          Danh sách
        </span>
      </Link>

      {/* Tập sau */}
      {nextChapter ? (
        <Link
          href={`/comic/${slug}/chapter/${nextChapter.chapter}`}
          className="flex flex-1 items-center justify-end gap-2 rounded-xl border bg-white px-4 py-3 text-right transition hover:bg-orange-50"
        >
          <div>
            <p className="text-xs text-gray-500">
              Tập sau
            </p>

            <p className="font-semibold">
              Tập {nextChapter.chapter}
            </p>
          </div>

          <ChevronRight size={20} />
        </Link>
      ) : (
        <div className="flex-1" />
      )}

    </div>
  );
}