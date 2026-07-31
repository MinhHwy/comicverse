import { comics } from "@/data/comics";

export default function AdminComicsPage() {
  return (
    <div className="mx-auto max-w-7xl p-10">

      <h1 className="mb-8 text-4xl font-bold">
        Quản lý truyện
      </h1>

      <table className="w-full border">

        <thead className="bg-orange-500 text-white">

          <tr>

            <th className="p-3">Tên truyện</th>

            <th>Số chương</th>

            <th>Lượt xem</th>

            <th>Trạng thái</th>

          </tr>

        </thead>

        <tbody>

          {comics.map((comic) => (
            <tr key={comic.id} className="border">

              <td className="p-4">
                {comic.title}
              </td>

              <td className="text-center">
                {comic.chapters}
              </td>

              <td className="text-center">
                {comic.views.toLocaleString()}
              </td>

              <td className="text-center">
                {comic.status}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}