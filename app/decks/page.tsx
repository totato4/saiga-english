import Link from "next/link";
import DeckList from "../ui/deck/deck-list";
import { Suspense } from "react";
import LoadingImg from "../ui/deck/loading-img";

const title = "100-английских-слов-по-частоте-употребления";

export default async function Page() {
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="mb-[100px] text-4xl ">
        Подборка карточек по английскому языку
      </h1>
      <div className="flex flex-nowrap justify-center items-center gap-x-[20px]">
        <label htmlFor="search" className="text-2xl flex flex-nowrap gap-x-3">
          Найти колоду:
          <input
            id="search"
            type="text"
            className="border border-gray-300 focus:border-blue-500 rounded-md text-[24px] bg-surface dark:bg-dark-surface"
          />
        </label>
        <span className="text-xl">или</span>
        <button className="px-[10px] rounded-2xl cursor-pointer h-[70px] bg-blue-400  border-2 text-gray-100 text-2xl bg-primary dark:bg-dark-primary text-text dark:text-dark-text">
          <Link href={"/decks/create"}>Создать свою колоду</Link>
        </button>
      </div>

      <Suspense fallback={<LoadingImg title={"Загружаем колоды..."} />}>
        <DeckList />
      </Suspense>
    </main>
  );
}
