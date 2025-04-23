import { Card } from "@/app/lib/definitions";

export default async function CardList({ cards }: { cards: Card[] }) {
  return <ul>{cards.map((card, i) => {})}</ul>;
}
