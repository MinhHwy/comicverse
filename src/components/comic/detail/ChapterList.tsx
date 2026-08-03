// import Link from "next/link";
// import { Chapter } from "@/types/chapter";

// interface Props {
//   slug: string;
//   chapters: Chapter[];
// }

// export default function ChapterList({
//   slug,
//   chapters,
// }: Props) {
//   console.log("Slug:", slug);
//   return (
//     <section className="mt-10">
//       <h2 className="mb-4 text-2xl font-bold">
//         Danh sách chương
//       </h2>

//       <div className="space-y-3">
//         {chapters.map((chapter) => (
//           <Link
//             key={chapter.id}
//             href={`/comic/${slug}/chapter/${chapter.chapter}`}
//             className="flex items-center justify-between rounded-lg border p-4 hover:bg-orange-50"
//           >
//             <span>
//               Tập {chapter.chapter} - {chapter.title}
//             </span>

//             <span className="text-sm text-gray-500">
//               {chapter.views.toLocaleString()} lượt xem
//             </span>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

import { Chapter } from "@/types/chapter";

interface Props {
  slug: string;
  chapters: Chapter[];
}

export default function ChapterList({
  slug,
  chapters: initialChapters,
}: Props) {
  const [chapters, setChapters] =
    useState<Chapter[]>(initialChapters);

  useEffect(() => {
    const loadChapters = async () => {
      try {
        const response = await fetch(
  `/api/comics/${slug}/chapters`,
  {
    cache: "no-store",
  }
);

        if (!response.ok) {
          throw new Error(
            "Không thể lấy danh sách chương"
          );
        }

        const data: Chapter[] =
          await response.json();

        setChapters(data);
      } catch (error) {
        console.error(
          "Load chapters error:",
          error
        );
      }
    };

    loadChapters();
  }, [slug]);

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
            className="flex items-center justify-between rounded-lg border bg-white p-4 transition hover:bg-orange-50"
          >
            <span>
              Tập {chapter.chapter} - {chapter.title}
            </span>

            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Eye size={16} />

              {(chapter.views ?? 0).toLocaleString("vi-VN")} lượt xem
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}