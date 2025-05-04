import TrainingCard from "@/app/ui/deck/training/training-card";
import { getDeckById } from "@/app/lib/actions";
import { getDeckCards } from "@/app/lib/data";

export default async function Page(props: {
  params: Promise<{ deck_id: string; title: string }>;
}) {
  const { deck_id } = await props.params;
  const deck = await getDeckById(deck_id);
  const cards = await getDeckCards(deck_id);
  return (
    <div className="flex flex-col w-[100%] justify-center items-center gap-y-[50px]">
      <h1 className="title">{deck.title}</h1>
      <TrainingCard cards={cards} />
    </div>
  );
}
