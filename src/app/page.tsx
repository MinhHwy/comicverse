import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import ComicSection from "@/components/home/ComicSection";
import { comics } from "@/data/comics";

export default function HomePage() {
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