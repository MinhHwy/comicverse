
// import Link from "next/link";
// import { BookOpen, Heart } from "lucide-react";

// interface ComicActionsProps {
//   slug: string;
// }

// export default function ComicActions({
//   slug,
// }: ComicActionsProps) {
//   return (
//     <div className="mt-8 flex flex-wrap gap-4">
//       {/* Đọc từ đầu */}
//       <Link
//         href={`/comic/${slug}/chapter/1`}
//         className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
//       >
//         <BookOpen size={20} />
//         Đọc từ đầu
//       </Link>

//       {/* Theo dõi */}
//       <button
//         className="flex items-center gap-2 rounded-xl border border-orange-500 px-6 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
//       >
//         <Heart size={20} />
//         Theo dõi
//       </button>
//     </div>
//   );
// }

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

interface ComicActionsProps {
  slug: string;
  latestChapter: number;
}

export default function ComicActions({
  slug,
  latestChapter,
}: ComicActionsProps) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {/* Đọc từ đầu */}
      <Link
        href={`/comic/${slug}/chapter/1`}
        className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        <BookOpen size={20} />
        Đọc từ đầu
      </Link>

      {/* Đọc mới nhất */}
      <Link
        href={`/comic/${slug}/chapter/${latestChapter}`}
        className="flex items-center gap-2 rounded-xl border border-orange-500 px-6 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
      >
        <ArrowRight size={20} />
        Đọc mới nhất
      </Link>
    </div>
  );
}