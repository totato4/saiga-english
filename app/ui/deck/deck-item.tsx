import Link from "next/link";
import { EditButton } from "./edit-button";
import { DeleteButton } from "./delete-button";

export default async function DeckItem({
  deck_id,
  title,
  user_id,
}: {
  deck_id: number;
  title: string;
  user_id: number;
}) {
  return (
    <li
      key={deck_id}
      className="flex flex-nowrap w-[100%] justify-between border-black border-2 rounded-2xl p-[10px] button-style "
    >
      <Link
        href={`/decks/training/${deck_id}`}
        className="font-medium col-span-full "
      >
        {title}
      </Link>
      <div className="flex gap-x-[10px] ml-[20px]">
        <EditButton deck_id={deck_id} />
        <DeleteButton deck_id={deck_id} user_id={user_id} title={title} />
      </div>
    </li>
  );
}
