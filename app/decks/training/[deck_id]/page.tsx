import TrainingCard from "@/app/components/training-card";
import { getDeckById } from "@/app/lib/actions";
import { getDeckCards } from "@/app/lib/data";
<<<<<<< HEAD
import CardList from "@/app/ui/deck/training/card-list";
=======
>>>>>>> f132675ec9a3d3d99ebf1f801be074130c08566a

export default async function Page(props: {
  params: Promise<{ deck_id: string; title: string }>;
}) {
  const { deck_id } = await props.params;
  const deck = await getDeckById(deck_id);
  const cards = await getDeckCards(deck_id);
  return (
    <div>
      <h1>{deck.title}</h1>
<<<<<<< HEAD
      <div>
        <CardList cards={cards} />
      </div>
=======
      <TrainingCard cards={cards} />
>>>>>>> f132675ec9a3d3d99ebf1f801be074130c08566a
    </div>
  );
}
