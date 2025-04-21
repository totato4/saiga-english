import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function createDeck({ title, user_id, is_public }: any) {
  try {
    const data = await sql`INSERT INTO decks (title, user_id, is_public) 
VALUES (${title}, ${user_id}, ${is_public}) 
RETURNING deck_id;  
`;

    // -- Вернет ID созданной колоды

    return data[0];
  } catch (error) {
    console.error("НЕ УДАЛОСЬ СОЗДАТЬ DECK");
  }
}

export async function deleteDeck({ deck_id, user_id }: any) {
  try {
    const data = await sql`WITH 
cards_in_target_deck AS (
  SELECT card_id 
  FROM deck_cards 
  WHERE deck_id = 1
),

delete_deck AS (
  DELETE FROM decks 
  WHERE deck_id = 1
  RETURNING deck_id
),

orphaned_cards AS (
  SELECT c.card_id 
  FROM cards_in_target_deck c
  WHERE NOT EXISTS (
    SELECT 1 
    FROM deck_cards dc 
    WHERE dc.card_id = c.card_id
  )
)

DELETE FROM cards 
WHERE card_id IN (SELECT card_id FROM orphaned_cards);
`;
    // -- Вернет удаленную запись (или пустой результат, если колоды не было)

    return data[0];
  } catch (error) {
    console.error("НЕ УДАЛОСЬ УДАЛИТЬ DECK");
  }
}

export async function updateDeck({ title, is_public, deck_id }: any) {
  try {
    const data = await sql`UPDATE decks 
SET 
    title = ${title},
    is_public = ${is_public},
    updated_at = NOW()
WHERE deck_id = ${deck_id}
RETURNING *;  -- Вернет обновленную запись
`;
    // -- Вернет обновленную запись

    return data[0];
  } catch (error) {
    console.error("НЕ УДАЛОСЬ ОБНОВИТЬ DECK");
  }
}

export async function getDeckById({ user_id }: any) {
  try {
    const data = await sql`SELECT * FROM decks 
WHERE user_id = ${user_id} 
ORDER BY created_at DESC;
`;

    return data[0];
  } catch (error) {
    console.error("НЕ УДАЛОСЬ ПОЛУЧИТЬ DECK ПО ID");
  }
}

export async function getDeckByTitle({ title }: any) {
  try {
    const data = await sql`SELECT * FROM decks 
WHERE title = ${title} 
ORDER BY created_at DESC;
`;

    return data[0];
  } catch (error) {
    console.error("НЕ УДАЛОСЬ ПОЛУЧИТЬ DECK ПО НАЗВАНИЮ");
  }
}

export async function createCard({ front, back, deck_id }: any) {
  try {
    const data = await sql`BEGIN;
  INSERT INTO cards (front, back) VALUES (${front}, ${back}) RETURNING card_id;
  INSERT INTO deck_cards (deck_id, card_id) VALUES (deck_id, currval('cards_card_id_seq'));
COMMIT;
`;

    return data[0];
  } catch (error) {
    console.error("НЕ УДАЛОСЬ СОЗДАТЬ CARD");
  }
}

export async function updateCard({ front, back, card_id }: any) {
  try {
    const data = await sql`UPDATE cards 
SET 
    front = ${front},
    back = ${back},
    updated_at = NOW()
WHERE card_id = ${card_id}
RETURNING *;
`;

    return data[0];
  } catch (error) {
    console.error("НЕ УДАЛОСЬ ОБНОВИТЬ CARD");
  }
}

export async function deleteCard({ card_id }: any) {
  try {
    const data = await sql`DELETE FROM cards 
WHERE card_id = 1
RETURNING *;
`;

    return data[0];
  } catch (error) {
    console.error("НЕ УДАЛОСЬ УДАЛИТЬ CARD");
  }
}

export async function addCardToDeck({ deck_id, card_id }: any) {
  try {
    const data = await sql`INSERT INTO deck_cards (deck_id, card_id) 
VALUES (${deck_id}, ${card_id})
ON CONFLICT (deck_id, card_id) DO NOTHING;
`;

    return data[0];
  } catch (error) {
    console.error("НЕ УДАЛОСЬ УДАЛИТЬ CARD");
  }
}

export async function deleteCardInDeck({ card_id, deck_id }: any) {
  try {
    const data = await sql`
      WITH deleted AS (
        DELETE FROM deck_cards 
        WHERE deck_id = ${deck_id} AND card_id = ${card_id}
        RETURNING card_id
      ),
      remaining_links AS (
        SELECT COUNT(*) AS links_count
        FROM deck_cards 
        WHERE card_id = ${card_id}
      )
      DELETE FROM cards
      WHERE card_id = ${card_id} 
        AND (SELECT COALESCE(links_count, 0) FROM remaining_links) = 0
      RETURNING card_id;
    `;

    return data[0]?.card_id || null;
  } catch (error) {
    console.error("Failed to delete card:", error);
    throw new Error("Не удалось удалить карточку");
  }
}

// -- Таблица колод
// CREATE TABLE decks (
//     deck_id SERIAL PRIMARY KEY,
//     title TEXT NOT NULL,
//     user_id INTEGER NOT NULL,
//     is_public BOOLEAN DEFAULT TRUE,
//     created_at TIMESTAMP DEFAULT NOW(),
//     updated_at TIMESTAMP DEFAULT NOW()
// );

// -- Таблица карточек
// CREATE TABLE cards (
//     card_id SERIAL PRIMARY KEY,
//     front TEXT NOT NULL,
//     back TEXT NOT NULL,
//     created_at TIMESTAMP DEFAULT NOW(),
//     updated_at TIMESTAMP DEFAULT NOW()
// );

// -- Связующая таблица для отношения многие-ко-многим
// CREATE TABLE deck_cards (
//     deck_id INTEGER REFERENCES decks(deck_id) ON DELETE CASCADE,
//     card_id INTEGER REFERENCES cards(card_id) ON DELETE CASCADE,
//     PRIMARY KEY (deck_id, card_id)
// );
