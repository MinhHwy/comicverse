interface Props {
  description: string;
}

export default function ComicDescription({
  description,
}: Props) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">
        Giới thiệu
      </h2>

      <p className="leading-8 text-gray-700">
        {description}
      </p>
    </section>
  );
}