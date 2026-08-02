"use client";

import { useEffect } from "react";

interface ViewCounterProps {
  slug: string;
  chapter: number;
}

export default function ViewCounter({
  slug,
  chapter,
}: ViewCounterProps) {
  useEffect(() => {
    const storageKey =
      `comicverse-view-${slug}-${chapter}`;

    // Đã tính view trong phiên hiện tại
    if (sessionStorage.getItem(storageKey)) {
      return;
    }

    const increaseView = async () => {
      try {
        const response = await fetch(
          `/api/chapters/${slug}/${chapter}/view`,
          {
            method: "POST",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Không thể cập nhật lượt xem"
          );
        }

        // Chỉ đánh dấu sau khi API thành công
        sessionStorage.setItem(
          storageKey,
          "true"
        );

        console.log(
          `Đã tính view: ${slug} - Tập ${chapter}`
        );
      } catch (error) {
        console.error(
          "Không thể cập nhật lượt xem:",
          error
        );
      }
    };

    increaseView();
  }, [slug, chapter]);

  return null;
}