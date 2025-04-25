import TrainingCard from "@/app/components/training-card";
import { getDeckById } from "@/app/lib/actions";
import { getDeckCards } from "@/app/lib/data";

export default async function Page(props: {
  params: Promise<{ deck_id: string; title: string }>;
}) {
  const { deck_id } = await props.params;
  const deck = await getDeckById(deck_id);
  const cards = await getDeckCards(deck_id);
  return (
    <div>
      <h1>{deck.title}</h1>
      <TrainingCard cards={cards} />
    </div>
  );
}
