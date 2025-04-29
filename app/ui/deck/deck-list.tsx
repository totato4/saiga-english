import { Deck } from "@/app/lib/definitions";
import DeckItem from "./deck-item";
import { getDeck } from "@/app/lib/data";

export default async function DeckList() {
  const decks = await getDeck();
  return (
    <ul className="text-3xl flex flex-col gap-y-4 justify-start">
      {decks.map((deck) => (
        <DeckItem
          deck_id={deck.deck_id}
          title={deck.title}
          user_id={deck.user_id}
          key={deck.deck_id}
        />
      ))}
    </ul>
  );
}

const Skeleton = () => {
  return <>Loading...</>;
};
