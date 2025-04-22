import Link from "next/link";
import { getDeck } from "../lib/data";
import Deck from "../ui/deck/deck";

const title = "100-английских-слов-по-частоте-употребления";

export default async function Page() {
  const decks = await getDeck();
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
            className="border border-gray-300 focus:border-blue-500 rounded-md text-[24px]"
          />
        </label>
        <span className="text-xl">или</span>
        <button className="px-[10px] rounded-2xl cursor-pointer h-[70px] bg-blue-400  border-2 text-gray-100 text-2xl">
          <Link href={"/decks/create"}>Создать свою колоду</Link>
        </button>
      </div>

      <ul className="text-3xl flex flex-col gap-y-4 justify-start">
        {decks.map((deck) => (
          <Deck
            deck_id={deck.deck_id}
            title={deck.title}
            user_id={deck.user_id}
            key={deck.deck_id}
          />
        ))}
      </ul>
    </main>
  );
}
