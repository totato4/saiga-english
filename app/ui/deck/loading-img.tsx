import Image from "next/image";

export default async function LoadingImg({ title }: { title: string }) {
  return (
    <div>
      <Image
        src="/sheep.gif"
        alt="loading gif animation"
        width={250}
        height={141}
        unoptimized={true} // Отключает сжатие, если нужно сохранить анимацию
      />
      <div>{title}</div>
    </div>
  );
}
