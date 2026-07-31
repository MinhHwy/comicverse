import Link from "next/link";

interface Props {
  slug: string;
  previousChapter?: number;
  nextChapter?: number;
}

export default function ReaderFooter({
  slug,
  previousChapter,
  nextChapter,
}: Props) {
  return (
    <div className="my-10 flex justify-center gap-6">

      {previousChapter && (
        <Link
          href={`/comic/${slug}/chapter/${previousChapter}`}
          className="rounded-xl bg-orange-500 px-6 py-3 text-white"
        >
          ← Chương trước
        </Link>
      )}

      {nextChapter && (
        <Link
          href={`/comic/${slug}/chapter/${nextChapter}`}
          className="rounded-xl bg-orange-500 px-6 py-3 text-white"
        >
          Chương sau →
        </Link>
      )}

    </div>
  );
}