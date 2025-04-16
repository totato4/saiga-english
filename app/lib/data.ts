import postgres from "postgres";
import { Card, Deck } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchCardList() {
  try {
    const data = await sql`SELECT * FROM cards`;
    return data;
  } catch (error) {
    console.error("Can't fetch cards", error);
    throw new Error("Failed to fetch cards"); // Лучше пробросить ошибку для обработки в компоненте
  }
}

// db.ts
export async function createDeck(
  deckData: Omit<Deck, "deck_id">
): Promise<Deck> {
  const [deck] = await sql<Deck[]>`
    INSERT INTO decks (title, user_id, is_public, cards)
    VALUES (
      ${deckData.title}, 
      ${deckData.user_id}, 
      ${deckData.is_public}, 
      ${JSON.stringify(deckData.cards)}
    )
    RETURNING *
  `;
  return deck;
}

export async function getDeckById(deckId: number): Promise<Deck | null> {
  const [deck] = await sql<Deck[]>`
    SELECT * FROM decks WHERE deck_id = ${deckId}
  `;
  return deck || null;
}

export async function updateDeckCards(
  deckId: number,
  newCards: Card[]
): Promise<Deck> {
  const [deck] = await sql<Deck[]>`
    UPDATE decks 
    SET cards = ${JSON.stringify(newCards)}, updated_at = NOW()
    WHERE deck_id = ${deckId}
    RETURNING *
  `;
  return deck;
}

export async function addCardToDeck(
  deckId: number,
  newCard: Card
): Promise<Deck> {
  const [deck] = await sql<Deck[]>`
    UPDATE decks 
    SET cards = cards || ${JSON.stringify([newCard])}::JSONB, 
        updated_at = NOW()
    WHERE deck_id = ${deckId}
    RETURNING *
  `;
  return deck;
}

// export async function fetchRevenue() {
//   try {
//     // Artificially delay a response for demo purposes.
//     // Don't do this in production :)

//     // console.log("Fetching revenue data...");
//     // await new Promise((resolve) => setTimeout(resolve, 3000));

//     const data = await sql<Revenue[]>`SELECT * FROM revenue`;

//     console.log("Data fetch completed after 3 seconds.");

//     return data;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch revenue data.");
//   }
// }

// export async function createDecksTable() {
//   try {
//     await sql`
//       CREATE TABLE IF NOT EXISTS decks (
//         deck_id SERIAL PRIMARY KEY,
//         title VARCHAR(100) NOT NULL,
//         user_id INTEGER NOT NULL,
//         is_public BOOLEAN DEFAULT FALSE,
//         cards JSONB NOT NULL DEFAULT '[]'::JSONB,
//         created_at TIMESTAMP DEFAULT NOW(),
//         updated_at TIMESTAMP DEFAULT NOW()
//       )
//     `;

//     // Создаем индекс для JSONB массива (для поиска по словам)
//     await sql`
//       CREATE INDEX IF NOT EXISTS idx_decks_cards_gin ON decks USING GIN (cards jsonb_path_ops)
//     `;
//     console.log("СОЗДАЛИ");
//     return "Таблица decks создана с JSONB полем для карточек";
//   } catch (error) {
//     console.error("Ошибка при создании таблицы:", error);
//     throw error;
//   }
// }

// export async function dropOldTables() {
//   try {
//     await sql`DROP TABLE IF EXISTS cards`;
//     await sql`DROP TABLE IF EXISTS decks`;
//     console.log("таблицы удалены");
//     return "Старые таблицы удалены";
//   } catch (error) {
//     console.error("Ошибка при удалении таблиц:", error);
//     throw error;
//   }
// }
