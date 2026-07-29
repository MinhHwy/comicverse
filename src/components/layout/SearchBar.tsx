import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-80">
      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

      <input
        type="text"
        placeholder="Tìm truyện..."
        className="w-full rounded-xl border bg-white py-2 pl-10 pr-4 outline-none transition focus:border-orange-500"
      />
    </div>
  );
}