import Image from "next/image";
import { Comic } from "@/types/comic";
import { Eye, Heart, Star, BookOpen } from "lucide-react";
import { formatNumber } from "@/utils/formatNumber";

interface Props {
  comic: Comic;
}

export default function ComicHeader({ comic }: Props) {
  return (
    <section className="grid gap-8 md:grid-cols-[280px_1fr]">
      <Image
        src={comic.cover}
        alt={comic.title}
        width={280}
        height={380}
        className="rounded-xl shadow-lg"
      />

      <div>
        <h1 className="text-4xl font-bold">{comic.title}</h1>

        <p className="mt-2 text-gray-500">
          {comic.author}
        </p>

        <div className="mt-6 flex flex-wrap gap-6">

          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" />
            {comic.rating}
          </div>

          <div className="flex items-center gap-2">
            <Eye />
            {formatNumber(comic.views)}
          </div>

          <div className="flex items-center gap-2">
            <Heart />
            {formatNumber(comic.followers)}
          </div>

          <div className="flex items-center gap-2">
            <BookOpen />
            {comic.chapters} tập
          </div>

        </div>

        <div className="mt-6">
          <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
            {comic.status}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {comic.categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-orange-100 px-3 py-1 text-orange-600"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}