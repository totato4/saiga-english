import postgres from "postgres";
import { Card, CardOperations, Deck, UpdateDeckParams } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getDeck() {
  try {
    const decks = await sql<Deck[]>`
      SELECT * FROM decks
    `;
    return decks;
  } catch (error) {
    console.error("Failed to create deck:", error);
    throw new Error("Не удалось создать колоду");
  }
}

export async function updateDeck({
  deck_id,
  title,
  is_public,
}: UpdateDeckParams): Promise<Deck> {
  try {
    const [deck] = await sql<Deck[]>`
      UPDATE decks 
      SET 
        title = ${title},
        is_public = ${is_public},
        updated_at = NOW()
      WHERE deck_id = ${deck_id}
      RETURNING *;
    `;
    return deck;
  } catch (error) {
    console.error("Failed to update deck:", error);
    throw new Error("Не удалось обновить колоду");
  }
}

export async function updateCard(
  card_id: number,
  front: string,
  back: string
): Promise<Card> {
  try {
    const [card] = await sql<Card[]>`
      UPDATE cards 
      SET 
        front = ${front},
        back = ${back},
        updated_at = NOW()
      WHERE card_id = ${card_id}
      RETURNING *;
    `;
    return card;
  } catch (error) {
    console.error("Failed to update card:", error);
    throw new Error("Не удалось обновить карточку");
  }
}

// Вспомогательные функции
export async function addCardToDeck({
  deck_id,
  card_id,
}: CardOperations): Promise<void> {
  try {
    await sql`
      INSERT INTO deck_cards (deck_id, card_id) 
      VALUES (${deck_id}, ${card_id})
      ON CONFLICT (deck_id, card_id) DO NOTHING;
    `;
  } catch (error) {
    console.error("Failed to add card to deck:", error);
    throw new Error("Не удалось добавить карточку в колоду");
  }
}

export async function getDeckCards(deck_id: string): Promise<Card[]> {
  try {
    return await sql<Card[]>`
      SELECT c.* FROM cards c
      JOIN deck_cards dc ON c.card_id = dc.card_id
      WHERE dc.deck_id = ${deck_id}
    `;
  } catch (error) {
    console.error("Failed to get deck cards:", error);
    throw new Error("Не удалось получить карточки колоды");
  }
}
