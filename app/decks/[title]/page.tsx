import { getDeck } from "@/app/lib/data";
import { DeleteButton } from "@/app/ui/deck/delete-button";
import { EditButton } from "@/app/ui/deck/edit-button";

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
              className="grid grid-cols-2 justify-items-center gap-2  p-3 bg-white rounded-lg shadow-sm w-[200px] h-[200px]"
            >
              <span className="font-medium col-span-full ">{deck.title}</span>
              <EditButton deck_id={deck.deck_id} />
              <DeleteButton
                deck_id={deck.deck_id}
                user_id={deck.user_id}
                title={title}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
