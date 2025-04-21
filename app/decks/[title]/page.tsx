import { getDeck } from "@/app/lib/data";
import { Deck } from "@/app/lib/definitions";
import { DeleteButton } from "@/app/ui/deck/DeleteButton";

export default async function Page(props: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await props.params;
  const decks = await getDeck();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{decodeURIComponent(title)}</h1>

      <section>
        <h2 className="text-xl mb-2">Список колод:</h2>
        <ul className="space-y-2">
          {decks.map((deck) => (
            <li
              key={deck.deck_id}
              className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm"
            >
              <span className="font-medium">{deck.title}</span>
              <DeleteButton
                deckId={deck.deck_id}
                userId={deck.user_id}
                title={title}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
