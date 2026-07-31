"use client";
import Link from "next/link";
// import { chapters } from "@/data/chapters";
import { comics } from "@/data/comics";
import { Chapter } from "@/types/chapter";
import { useEffect, useState } from "react";

export default function AdminChaptersPage() {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
  fetch("/api/chapters")
    .then((response) => response.json())
    .then((data) => {
      setChapters(data);
      setLoading(false);
    });
}, []);
  return (
    <div className="mx-auto max-w-7xl p-10">

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Quản lý chương
          </h1>

          <p className="mt-2 text-gray-500">
            Quản lý các tập truyện của ComicVerse
          </p>
        </div>

        <Link
          href="/admin/chapters/new"
          className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
        >
          + Thêm chương
        </Link>
      </div>
      
      <div className="overflow-hidden rounded-2xl border bg-white shadow">
        {loading ? (
  <div className="p-10 text-center text-gray-500">
    Đang tải dữ liệu...
  </div>
) : (
        <table className="w-full">

          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-4 text-left">Bộ truyện</th>
              <th className="p-4 text-left">Tập</th>
              <th className="p-4 text-left">Tên chương</th>
              <th className="p-4 text-center">Lượt xem</th>
            </tr>
          </thead>

          <tbody>
            {chapters.map((chapter) => {

              const comic = comics.find(
                (comic) => comic.slug === chapter.comicSlug
              );

              return (
                <tr
                  key={chapter.id}
                  className="border-b hover:bg-orange-50"
                >
                  <td className="p-4 font-semibold">
                    {comic?.title}
                  </td>

                  <td className="p-4">
                    Tập {chapter.chapter}
                  </td>

                  <td className="p-4">
                    {chapter.title}
                  </td>

                  <td className="p-4 text-center">
                    {chapter.views.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
        )}
      </div>

    </div>
  );
}