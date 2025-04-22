import { createCard, getDeckById } from "@/app/lib/actions";
import { getDeckCards } from "@/app/lib/data";

export default async function Page(props: {
  params: Promise<{ deck_id: string; title: string }>;
}) {
  const { deck_id } = await props.params;
  const deck = await getDeckById(deck_id);
  const cards = await getDeckCards(deck_id);

  return (
    <div className="flex flex-col items-center gap-y-[40px]">
      <h1 className="text-2xl">{deck.title}</h1>
      <form
        action={createCard}
        className="flex flex-col justify-center items-center gap-y-[20px]"
      >
        <h2>Добавить слово в колоду</h2>
        <label
          htmlFor="front"
          className="w-[280px] gap-[10px] flex justify-end flex-nowrap "
        >
          <span>слово:</span>
          <input
            type="text"
            id="front"
            name="front"
            className="bg-blue-100 rounded-2xl border-2 border-blue-400"
          />
        </label>

        <label
          htmlFor="back"
          className="w-[280px] gap-[10px] flex justify-end flex-nowrap"
        >
          <span>перевод:</span>
          <input
            type="text"
            id="back"
            name="back"
            className="bg-blue-100 rounded-2xl border-2 border-blue-400 "
          />
        </label>

        <input
          type="hidden"
          id="deck_id"
          name="deck_id"
          value={deck_id}
          className="bg-blue-100 rounded-2xl border-2 border-blue-400 "
        />
        <button
          type="submit"
          className="py-[10px] px-[20px] bg-blue-400 rounded-2xl"
        >
          добавить
        </button>
      </form>
      <h2>Слова в колоде</h2>
      <div>
        {cards.map((card, i) => (
          <div key={card.card_id}>{card.front}</div>
        ))}
      </div>
    </div>
  );
}
