import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col">
      <h1
        className=" mx-auto pt-10  
      
      "
      >
        Saiga English
      </h1>
      <h2 className="text-display mx-auto ">
        Платформа для изучения Английского языка
      </h2>
      <div>
        <Link href={"/decks"}>Карточки по английскому языку</Link>
      </div>
    </main>
  );
}
