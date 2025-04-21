"use server";

import postgres from "postgres";
import { Card, CreateDeckParams, Deck, DeleteDeckParams } from "./definitions";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function deleteCard(card_id: number): Promise<Card> {
  try {
    const [card] = await sql<Card[]>`
      DELETE FROM cards 
      WHERE card_id = ${card_id}
      RETURNING *;
    `;
    return card;
  } catch (error) {
    console.error("Failed to delete card:", error);
    throw new Error("Не удалось удалить карточку");
  }
}

// Функции для работы с колодами
export async function createDeck({
  title,
  user_id,
  is_public = true,
}: CreateDeckParams): Promise<Deck> {
  try {
    const [deck] = await sql<Deck[]>`
      INSERT INTO decks (title, user_id, is_public) 
      VALUES (${title}, ${user_id}, ${is_public}) 
      RETURNING *;
    `;
    return deck;
  } catch (error) {
    console.error("Failed to create deck:", error);
    throw new Error("Не удалось создать колоду");
  }
}

export async function deleteDeck(formData: FormData) {
  const deck_id = formData.get("deck_id") as string;
  const user_id = formData.get("user_id") as string;
  const title = formData.get("title") as string;
  try {
    const [deck] = await sql<Deck[]>`
      WITH 
        cards_in_target_deck AS (
          SELECT card_id FROM deck_cards WHERE deck_id = ${deck_id}
        ),
        delete_deck AS (
          DELETE FROM decks 
          WHERE deck_id = ${deck_id} AND user_id = ${user_id}
          RETURNING *
        ),
        orphaned_cards AS (
          SELECT c.card_id 
          FROM cards_in_target_deck c
          WHERE NOT EXISTS (
            SELECT 1 FROM deck_cards dc WHERE dc.card_id = c.card_id
          )
        )
      DELETE FROM cards 
      WHERE card_id IN (SELECT card_id FROM orphaned_cards)
      RETURNING *;
    `;
  } catch (error) {
    throw new Error("Не удалось удалить колоду");
  }
  revalidatePath(`/decks/${title}`);
}
