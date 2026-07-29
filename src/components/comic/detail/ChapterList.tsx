import Link from "next/link";
import { Chapter } from "@/types/chapter";

interface Props {
  slug: string;
  chapters: Chapter[];
}

export default function ChapterList({
  slug,
  chapters,
}: Props) {
  console.log("Slug:", slug);
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">
        Danh sách chương
      </h2>

      <div className="space-y-3">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/comic/${slug}/chapter/${chapter.chapter}`}
            className="flex items-center justify-between rounded-lg border p-4 hover:bg-orange-50"
          >
            <span>
              Tập {chapter.chapter} - {chapter.title}
            </span>

            <span className="text-sm text-gray-500">
              {chapter.views.toLocaleString()} lượt xem
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}