// Типы данных
export interface Deck {
  deck_id: number;
  title: string;
  user_id: number;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Card {
  card_id: number;
  front: string;
  back: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

export type User = {
  id: string;
  nick: string;
  name: string;
  email: string;
  password: string;
};

// Параметры для функций
export interface CreateDeckParams {
  title: string;
  user_id: number;
  is_public?: boolean;
}

export interface DeleteDeckParams {
  deck_id: number;
  user_id: number;
  title: string;
}

export interface UpdateDeckParams {
  deck_id: number;
  title: string;
  is_public: boolean;
}

export interface GetDeckParams {
  deck_id: number;
  user_id: number;
}

export interface CardOperations {
  card_id: number;
  deck_id: number;
}
