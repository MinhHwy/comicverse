import { BookOpen, Heart } from "lucide-react";

export default function ComicActions() {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <button className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">
        <BookOpen size={20} />
        Đọc từ đầu
      </button>

      <button className="flex items-center gap-2 rounded-xl border border-orange-500 px-6 py-3 font-semibold text-orange-500 transition hover:bg-orange-50">
        <Heart size={20} />
        Theo dõi
      </button>
    </div>
  );
}