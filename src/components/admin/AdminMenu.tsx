import Link from "next/link";

const menus = [
  {
    title: "📚 Quản lý truyện",
    href: "/admin/comics",
  },
  {
    title: "📖 Quản lý chương",
    href: "/admin/chapters",
  },
  {
    title: "🖼 Upload ảnh",
    href: "/admin/upload",
  },
  {
    title: "📊 Thống kê",
    href: "/admin/statistics",
  },
];

export default function AdminMenu() {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      {menus.map((menu) => (
        <Link
          key={menu.href}
          href={menu.href}
          className="rounded-xl border p-6 text-lg font-semibold hover:bg-orange-50"
        >
          {menu.title}
        </Link>
      ))}
    </div>
  );
}