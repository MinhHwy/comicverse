"use client";

import { useState } from "react";
import Link from "next/link";
import { comics } from "@/data/comics";

export default function NewChapterPage() {
  const [comicSlug, setComicSlug] = useState("");
  const [chapter, setChapter] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const response = await fetch("/api/chapters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comicSlug,
      chapter,
      title,
    }),
  });

  if (!response.ok) {
    alert("Có lỗi xảy ra!");
    return;
  }

  alert("Đã tạo chương thành công!");

  setComicSlug("");
  setChapter("");
  setTitle("");
};

  return (
    <div className="mx-auto max-w-3xl p-10">

      <div className="mb-8">
        <Link
          href="/admin/chapters"
          className="text-sm text-orange-500 hover:underline"
        >
          ← Quay lại quản lý chương
        </Link>

        <h1 className="mt-4 text-4xl font-bold">
          Thêm chương mới
        </h1>

        <p className="mt-2 text-gray-500">
          Tạo một chương mới cho bộ truyện
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border bg-white p-8 shadow"
      >

        {/* Bộ truyện */}
        <div>
          <label className="mb-2 block font-semibold">
            Bộ truyện
          </label>

          <select
            value={comicSlug}
            onChange={(e) => setComicSlug(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
            required
          >
            <option value="">
              -- Chọn bộ truyện --
            </option>

            {comics.map((comic) => (
              <option
                key={comic.id}
                value={comic.slug}
              >
                {comic.title}
              </option>
            ))}
          </select>
        </div>

        {/* Số tập */}
        <div>
          <label className="mb-2 block font-semibold">
            Số tập
          </label>

          <input
            type="number"
            min="1"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            placeholder="Ví dụ: 4"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
            required
          />
        </div>

        {/* Tên tập */}
        <div>
          <label className="mb-2 block font-semibold">
            Tên tập
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ví dụ: Trạng Quỳnh đi thi"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">

          <Link
            href="/admin/chapters"
            className="flex-1 rounded-xl border px-5 py-3 text-center font-semibold hover:bg-gray-50"
          >
            Hủy
          </Link>

          <button
            type="submit"
            className="flex-1 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
          >
            + Thêm chương
          </button>

        </div>

      </form>

    </div>
  );
}