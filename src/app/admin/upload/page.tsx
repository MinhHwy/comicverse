"use client";

import { useEffect, useState } from "react";

interface Comic {
  id: number;
  slug: string;
  title: string;
}

export default function UploadPage() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [comicSlug, setComicSlug] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // =========================
  // Lấy danh sách truyện
  // =========================

  useEffect(() => {
    const loadComics = async () => {
      try {
        const response = await fetch("/api/comics", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            "Không thể lấy danh sách truyện"
          );
        }

        const data = await response.json();

        setComics(data);
      } catch (error) {
        console.error(
          "Load comics error:",
          error
        );

        alert(
          "Không thể tải danh sách truyện!"
        );
      } finally {
        setLoading(false);
      }
    };

    loadComics();
  }, []);

  // =========================
  // Chọn ảnh
  // =========================

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(
      event.target.files
    );

    setFiles(selectedFiles);
  };

  // =========================
  // Upload
  // =========================

  const handleUpload = async () => {
    if (!comicSlug) {
      alert(
        "Vui lòng chọn bộ truyện!"
      );
      return;
    }

    if (!chapter) {
      alert(
        "Vui lòng nhập số tập!"
      );
      return;
    }

    if (!chapterTitle.trim()) {
      alert(
        "Vui lòng nhập tên chương!"
      );
      return;
    }

    if (files.length === 0) {
      alert(
        "Vui lòng chọn ảnh!"
      );
      return;
    }

    setUploading(true);

    const formData = new FormData();

    formData.append(
      "comicSlug",
      comicSlug
    );

    formData.append(
      "chapter",
      chapter
    );

    formData.append(
      "chapterTitle",
      chapterTitle.trim()
    );

    files.forEach((file) => {
      formData.append(
        "files",
        file
      );
    });

    try {
      const response = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Upload thất bại!"
        );

        return;
      }

      console.log(
        "Upload result:",
        data
      );

      alert(
        `Upload thành công ${data.files.length} ảnh!`
      );

      setFiles([]);
      setChapter("");
      setChapterTitle("");
    } catch (error) {
      console.error(
        "Upload error:",
        error
      );

      alert(
        "Không thể kết nối tới server!"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          🖼 Upload ảnh truyện
        </h1>

        <p className="mt-2 text-gray-500">
          Upload toàn bộ ảnh của một chương truyện
        </p>
      </div>

      <div className="space-y-6 rounded-2xl border bg-white p-8 shadow">

        {/* =========================
            Bộ truyện
        ========================= */}

        <div>
          <label className="mb-2 block font-semibold">
            Bộ truyện
          </label>

          {loading ? (
            <div className="rounded-xl border px-4 py-3 text-gray-500">
              Đang tải danh sách truyện...
            </div>
          ) : (
            <select
              value={comicSlug}
              onChange={(e) =>
                setComicSlug(
                  e.target.value
                )
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="">
                -- Chọn bộ truyện --
              </option>

              {comics.map(
                (comic) => (
                  <option
                    key={comic.id}
                    value={comic.slug}
                  >
                    {comic.title}
                  </option>
                )
              )}
            </select>
          )}
        </div>

        {/* =========================
            Số tập
        ========================= */}

        <div>
          <label className="mb-2 block font-semibold">
            Số tập
          </label>

          <input
            type="number"
            min="1"
            value={chapter}
            onChange={(e) =>
              setChapter(
                e.target.value
              )
            }
            placeholder="Ví dụ: 4"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        {/* =========================
            Tên chương
        ========================= */}

        <div>
          <label className="mb-2 block font-semibold">
            Tên chương
          </label>

          <input
            type="text"
            value={chapterTitle}
            onChange={(e) =>
              setChapterTitle(
                e.target.value
              )
            }
            placeholder="Ví dụ: Đại chiến với quan huyện"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
          />

          <p className="mt-2 text-sm text-gray-500">
            Tên này sẽ được lưu vào Database
            và hiển thị khi đọc truyện.
          </p>
        </div>

        {/* =========================
            Upload ảnh
        ========================= */}

        <div>
          <label className="mb-2 block font-semibold">
            Ảnh truyện
          </label>

          <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-orange-500 hover:bg-orange-50">

            <div className="text-5xl">
              📸
            </div>

            <p className="mt-4 font-semibold">
              Chọn ảnh truyện
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Có thể chọn nhiều ảnh cùng lúc
            </p>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={
                handleFileChange
              }
              className="hidden"
            />

          </label>
        </div>

        {/* =========================
            Danh sách ảnh
        ========================= */}

        {files.length > 0 && (
          <div>
            <h2 className="mb-3 font-semibold">
              Đã chọn{" "}
              {files.length} ảnh
            </h2>

            <div className="max-h-60 overflow-y-auto rounded-xl border">

              {files.map(
                (file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between border-b px-4 py-3 last:border-b-0"
                  >
                    <span className="truncate">
                      {file.name}
                    </span>

                    <span className="ml-4 text-sm text-gray-500">
                      {(
                        file.size /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
                    </span>
                  </div>
                )
              )}

            </div>
          </div>
        )}

        {/* =========================
            Button
        ========================= */}

        <button
          type="button"
          onClick={handleUpload}
          disabled={
            loading ||
            uploading
          }
          className="w-full rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading
            ? "⏳ Đang upload..."
            : "📤 Upload ảnh"}
        </button>

      </div>

    </div>
  );
}