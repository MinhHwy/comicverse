import Link from "next/link";

interface Props {
  comicTitle: string;
  chapter: number;
  chapterTitle: string;
  previousChapter?: number;
  nextChapter?: number;
  slug: string;
}

export default function ReaderHeader({
  comicTitle,
  chapter,
  chapterTitle,
  previousChapter,
  nextChapter,
  slug,
}: Props) {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

        {previousChapter ? (
          <Link
            href={`/comic/${slug}/chapter/${previousChapter}`}
            className="text-orange-500 hover:underline"
          >
            ← Chương trước
          </Link>
        ) : (
          <div />
        )}

        <div className="text-center">
          <h1 className="font-bold">
            {comicTitle}
          </h1>

          <p className="text-sm text-gray-500">
            Tập {chapter} - {chapterTitle}
          </p>
        </div>

        {nextChapter ? (
          <Link
            href={`/comic/${slug}/chapter/${nextChapter}`}
            className="text-orange-500 hover:underline"
          >
            Chương sau →
          </Link>
        ) : (
          <div />
        )}

      </div>
    </header>
  );
}