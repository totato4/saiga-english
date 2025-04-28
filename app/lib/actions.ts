"use server";

import postgres from "postgres";
import { Card, Deck } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function getDeckById(deck_id: string): Promise<Deck> {
  try {
    const [deck] = await sql<Deck[]>`
      SELECT * FROM decks 
      WHERE deck_id = ${deck_id}
      
    `;
    return deck;
  } catch (error) {
    console.error("Failed to delete card:", error);
    throw new Error("Не удалось получить deck по id");
  }
}

// Функции для работы с колодами
export async function createDeck(formData: FormData) {
  const title = formData.get("title") as string;
  const user_id = formData.get("user_id") as string;
  const is_public = formData.get("is_public") as string;
  try {
    await sql<Deck[]>`
      INSERT INTO decks (title, user_id, is_public) 
      VALUES (${title}, ${user_id}, ${is_public}) 
      RETURNING *;
    `;
  } catch (error) {
    console.error("Failed to create deck:", error);
    throw new Error("Не удалось создать колоду");
  }
  redirect("/decks");
}

export async function deleteDeck(formData: FormData) {
  const deck_id = formData.get("deck_id") as string;
  const user_id = formData.get("user_id") as string;
  const title = formData.get("title") as string;
  try {
    await sql<Deck[]>`
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
  } catch {
    throw new Error("Не удалось удалить колоду");
  }
  revalidatePath(`/decks/${title}`);
}

// Функции для работы с карточками
export async function createCard(formData: FormData) {
  const front = formData.get("front") as string;
  const back = formData.get("back") as string;
  const deck_id = formData.get("deck_id") as string;
  const image_url = formData.get("image_url") as string;
  try {
    await sql.begin(async (transaction) => {
      const [card] = await transaction<Card[]>`
        INSERT INTO cards (front, back, image_url) 
        VALUES (${front}, ${back}, ${image_url}) 
        RETURNING *;
      `;

      await transaction`
        INSERT INTO deck_cards (deck_id, card_id) 
        VALUES (${deck_id}, ${card.card_id})
      `;
    });
  } catch (error) {
    console.error("Failed to create card:", error);
    throw new Error("Не удалось создать карточку");
  }
  revalidatePath(`/decks/${deck_id}`);
}
