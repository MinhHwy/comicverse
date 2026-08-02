import Image from "next/image";
import Link from "next/link";
import { Eye, BookOpen, Star, Heart } from "lucide-react";

import { formatNumber } from "@/utils/formatNumber";
import { Comic } from "@/types/comic";

// interface Comic {
//   id: number;
//   slug: string;
//   title: string;
//   cover: string;
//   views: number;
//   followers: number;
//   rating: number | string;
//   chapterCount: number;
// }

interface ComicCardProps {
  comic: Comic;
}

export default function ComicCard({
  comic,
}: ComicCardProps) {
  return (
    <Link
      href={`/comic/${comic.slug}`}
      className="group overflow-hidden rounded-2xl bg-white shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={comic.cover}
          alt={comic.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-4">

        <h3 className="line-clamp-1 text-lg font-bold">
          {comic.title}
        </h3>

        <div className="flex justify-between text-sm text-gray-500">

          <span className="flex items-center gap-1">
            <Eye size={16} />
            {formatNumber(comic.views)}
          </span>

          <span className="flex items-center gap-1">
            <Star size={16} />
            {comic.rating}
          </span>

        </div>

        <div className="flex justify-between text-sm text-gray-500">

          <span className="flex items-center gap-1">
            <BookOpen size={16} />
            {comic.chapterCount} tập
          </span>

          <span className="flex items-center gap-1">
            <Heart size={16} />
            {formatNumber(comic.followers)}
          </span>

        </div>

        <button className="w-full rounded-xl bg-orange-500 py-2 font-semibold text-white transition hover:bg-orange-600">
          📖 Đọc ngay
        </button>

      </div>
    </Link>
  );
}