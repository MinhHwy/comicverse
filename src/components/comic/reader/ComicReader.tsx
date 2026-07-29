import Image from "next/image";

interface Props {
  images: string[];
}

export default function ComicReader({ images }: Props) {
  return (
    <div className="mx-auto max-w-4xl">

      {images.map((image) => (
        <Image
          key={image}
          src={image}
          alt=""
          width={900}
          height={1200}
          className="mb-2 w-full rounded"
        />
      ))}

    </div>
  );
}