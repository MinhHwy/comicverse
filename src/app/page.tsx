import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import ComicSection from "@/components/home/ComicSection";
import { notFound } from "next/navigation";
import { Comic } from "@/types/comic";


// interface Comic {
//   id: number;
//   slug: string;
//   title: string;
//   alternativeTitle: string | null;
//   author: string;
//   artist: string;
//   description: string;
//   cover: string;
//   banner: string | null;
//   status: string;
//   views: number;
//   followers: number;
//   rating: number | string;
//   publishedYear: number;
//   chapterCount: number;
// }
// interface Comic {
//   id: number;
//   slug: string;
//   title: string;
//   alternativeTitle: string | null;
//   author: string;
//   artist: string;
//   description: string;
//   cover: string;
//   banner: string | null;
//   status: string;

//   categories: string[];
//   chapters: number;

//   views: number;
//   followers: number;
//   rating: number | string;
//   publishedYear: number;

//   chapterCount: number;
// }

export default async function HomePage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/comics`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    notFound();
  }

  const comics: Comic[] = await response.json();

  return (
    <MainLayout>

      <Hero />

      <ComicSection
        title="🔥 Truyện nổi bật"
        comics={comics}
      />

      <ComicSection
        title="📚 Mới cập nhật"
        comics={comics}
      />

      <ComicSection
        title="👁 Xem nhiều"
        comics={comics}
      />

    </MainLayout>
  );
}