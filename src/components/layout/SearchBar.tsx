"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState } from "react";

import { comics } from "@/data/comics";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const keyword = query.trim().toLowerCase();

  const results =
    keyword.length === 0
      ? []
      : comics.filter((comic) =>
          `${comic.title} ${comic.alternativeTitle ?? ""}`
            .toLowerCase()
            .includes(keyword)
        );

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center rounded-xl border bg-white px-4 py-2 shadow-sm">
        <Search
          size={20}
          className="mr-2 text-gray-400"
        />

        <input
          type="text"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="Tìm kiếm truyện..."
          className="w-full bg-transparent outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border bg-white shadow-xl">
          {results.map((comic) => (
            <Link
              key={comic.id}
              href={`/comic/${comic.slug}`}
              onClick={() => setQuery("")}
              className="block border-b px-4 py-3 last:border-b-0 hover:bg-orange-50"
            >
              <p className="font-semibold">
                {comic.title}
              </p>

              {comic.alternativeTitle && (
                <p className="text-sm text-gray-500">
                  {comic.alternativeTitle}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}

      {keyword.length > 0 &&
        results.length === 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border bg-white p-4 text-center text-sm text-gray-500 shadow-xl">
            Không tìm thấy truyện.
          </div>
        )}
    </div>
  );
}