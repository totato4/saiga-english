import { getDeckById } from "@/app/lib/actions";

export default async function Page(props: {
  params: Promise<{ deck_id: string; title: string }>;
}) {
  const { deck_id } = await props.params;
  const deck = await getDeckById(deck_id);
  return (
    <div>
      <h1>{deck.title}</h1>
    </div>
  );
}
