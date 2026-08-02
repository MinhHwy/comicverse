import ComicCard from "../comic/ComicCard";
import { Comic } from "@/types/comic";

interface ComicSectionProps {
  title: string;
  comics: Comic[];
}

export default function ComicSection({
  title,
  comics,
}: ComicSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">

      <h2 className="mb-8 text-3xl font-bold">
        {title}
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {comics.map((comic) => (
          <ComicCard
            key={comic.id}
            comic={comic}
          />
        ))}
      </div>

    </section>
  );
}