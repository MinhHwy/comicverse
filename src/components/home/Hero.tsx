export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-orange-400 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="text-5xl font-bold">
          Khám phá kho truyện tuổi thơ Việt Nam
        </h1>

        <p className="mt-6 max-w-2xl text-xl">
          Đọc lại những bộ truyện gắn liền với tuổi thơ như
          Trạng Quỳnh, Thần Đồng Đất Việt, Trạng Quỷnh...
        </p>

        <button className="mt-10 rounded-xl bg-white px-8 py-3 font-bold text-orange-500 transition hover:scale-105">
          📖 Đọc ngay
        </button>

      </div>
    </section>
  );
}