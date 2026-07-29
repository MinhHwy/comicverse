import Link from "next/link";
import { Heart, Moon, User } from "lucide-react";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { navigation } from "@/constants/navigation";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium transition hover:text-orange-500"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <SearchBar />

          <button className="rounded-lg p-2 hover:bg-orange-100">
            <Heart />
          </button>

          <button className="rounded-lg p-2 hover:bg-orange-100">
            <Moon />
          </button>

          <button className="rounded-lg p-2 hover:bg-orange-100">
            <User />
          </button>
        </div>
      </div>
    </header>
  );
}