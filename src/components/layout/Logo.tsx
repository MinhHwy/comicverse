import Link from "next/link";
// import { BookOpen } from "lucide-react";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
    >
      {/* <BookOpen className="h-8 w-8 text-orange-500" />

      <span className="text-3xl font-extrabold text-slate-800">
        ComicVerse
      </span> */}
      <Image
  src="/logo-comicverse.png"
  alt="ComicVerse"
  width={180}
  height={70}
  priority
/>
    </Link>
  );
}