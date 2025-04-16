export interface Card {
  image_url?: string;
  english_word: string;
  russian_word: string;
}

export interface Deck {
  deck_id: number;
  title: string;
  user_id: number;
  is_public: boolean;
  cards: Card[];
  created_at?: string;
  updated_at?: string;
}
