// interface PageProps {
//   params: Promise<{
//     slug: string;
//   }>;
// }

// export default async function ComicDetailPage({
//   params,
// }: PageProps) {
//   const { slug } = await params;

//   return (
//     <div className="mx-auto max-w-7xl p-8">
//       <h1 className="text-4xl font-bold">
//         {slug}
//       </h1>
//     </div>
//   );
// }
import { notFound } from "next/navigation";

import ComicHeader from "@/components/comic/detail/ComicHeader";
import ComicDescription from "@/components/comic/detail/ComicDescription";
import ComicActions from "@/components/comic/detail/ComicActions";
import ChapterList from "@/components/comic/detail/ChapterList";

import { comics } from "@/data/comics";
import { chapters } from "@/data/chapters";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ComicDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  console.log("URL slug:", slug);

  const comic = comics.find((c) => c.slug === slug);
  console.log("Comic:", comic);

  if (!comic) {
    notFound();
  }

  const comicChapters = chapters
    .filter((c) => c.comicSlug === slug)
    .sort((a, b) => b.chapter - a.chapter);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <ComicHeader comic={comic} />

      <ComicActions />

      <ComicDescription
        description={comic.description}
      />

      <ChapterList
  slug={comic.slug}
  chapters={comicChapters}
/>

    </div>
  );
}