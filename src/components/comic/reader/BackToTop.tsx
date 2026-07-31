"use client";

export default function BackToTop() {
  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="fixed bottom-8 right-8 rounded-full bg-orange-500 px-4 py-3 text-white shadow-lg hover:bg-orange-600"
    >
      ↑
    </button>
  );
}