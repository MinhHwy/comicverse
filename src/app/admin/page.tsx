import AdminMenu from "@/components/admin/AdminMenu";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl p-10">

      <h1 className="mb-8 text-4xl font-bold">
        📚 ComicVerse Admin
      </h1>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border p-6 shadow">
          <h2 className="text-xl font-bold">
            Tổng số truyện
          </h2>

          <p className="mt-4 text-4xl font-bold text-orange-500">
            3
          </p>
        </div>

        <div className="rounded-2xl border p-6 shadow">
          <h2 className="text-xl font-bold">
            Tổng số chương
          </h2>

          <p className="mt-4 text-4xl font-bold text-orange-500">
            6
          </p>
        </div>

        <div className="rounded-2xl border p-6 shadow">
          <h2 className="text-xl font-bold">
            Tổng lượt xem
          </h2>

          <p className="mt-4 text-4xl font-bold text-orange-500">
            6.7M
          </p>
        </div>

      </div>

    </div>
  );
}