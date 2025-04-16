import Link from "next/link";
import { addTitleColumn, fetchRevenue } from "../lib/data";

export default async function Page() {
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="mb-[100px] text-4xl text-amber-900">
        Подборка карточек по английскому языку
      </h1>
      <button className="w-[300px] bg-amber-400 rounded-2xl h-[100px] mb-[100px]">
        <Link href={"/decks/create"}>Создать свой набор карточек</Link>
      </button>
      <ul className="text-3xl flex flex-col gap-y-4 justify-start">
        {/* {data.map((obj) => (
          <div>{obj.revenue}</div>
        ))} */}
        <li>
          <Link href="/cards/100-английских-слов-по-частоте-употребления">
            100 английских слов по частоте употребления
          </Link>
        </li>
        <li>
          <Link href="/cards/100-английских-слов-по-частоте-употребления">
            100-200 английских слов по частоте употребления
          </Link>
        </li>
        <li>
          <Link href="/cards/100-английских-слов-по-частоте-употребления">
            200-300 английских слов по частоте употребления
          </Link>
        </li>
        <li>
          <Link href="/cards/100-английских-слов-по-частоте-употребления">
            300-400 английских слов по частоте употребления
          </Link>
        </li>
      </ul>
    </main>
  );
}
