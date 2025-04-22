import Image from "next/image";
import ThemeToggle from "./ui/ThemeToggle";
import Link from "next/link";
import CreateModal from "./ui/deck/create-modal";

export default function Page() {
  return (
    <main className="flex flex-col">
      <h1 className=" mx-auto pt-10  bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark ">
        Saiga English
      </h1>
      <h2 className="text-display mx-auto ">
        Платформа для изучения Английского языка
      </h2>
      <div>
        <CreateModal />
        <Link href={"/decks"}>Карточки по английскому языку</Link>
      </div>
    </main>
  );
}
