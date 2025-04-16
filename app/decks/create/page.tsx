"use client";

import { createDeck } from "@/app/lib/data";
import { Card } from "@/app/lib/definitions";
import { useState } from "react";

// export interface Card {
//   id: number;
//   image_url: string;
//   english_word: string;
//   russian_word: string;
// }

export default function Page() {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [card, setCard] = useState<Card>({
    image_url: "",
    english_word: "",
    russian_word: "",
  });

  const addCard = () => {
    setCardList([...cardList, card]);
    setCard({
      image_url: "",
      english_word: "",
      russian_word: "",
    });
  };
  const deleteCard = (obj: Card) => {
    setCardList(cardList.filter((elem) => elem !== obj));
  };
  return (
    <main className="flex justify-center">
      <div className="flex w-[100%] justify-between max-w-[700px]">
        <div className="flex gap-y-2 flex-col flex-nowrap justify-between max-w-[400px]">
          <h1>Добавить слово в колоду:</h1>
          <div className="flex flex-nowrap gap-x-2 gap-y-2 w-[100%] justify-between">
            <label htmlFor="english_word">слово на английском:</label>
            <input
              className="bg-amber-50"
              type="text"
              value={card.english_word}
              id="english_word"
              onChange={(e) => {
                setCard((prevState) => ({
                  ...prevState,
                  english_word: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-nowrap gap-x-2 gap-y-2 w-[100%] justify-between">
            <label htmlFor="russian_word">перевод:</label>
            <input
              className="bg-amber-50"
              type="text"
              value={card.russian_word}
              id="russian_word"
              onChange={(e) => {
                setCard((prevState) => ({
                  ...prevState,
                  russian_word: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-nowrap gap-x-2 gap-y-2 w-[100%] justify-between">
            <label htmlFor="image_url">вставьте url картинки:</label>
            <input
              className="bg-amber-50"
              type="text"
              value={card.image_url}
              id="image_url"
              onChange={(e) => {
                setCard((prevState) => ({
                  ...prevState,
                  image_url: e.target.value,
                }));
              }}
            />
          </div>
          <button onClick={() => addCard()}>Добавить карточку в колоду</button>
        </div>
        <div className="flex items-center gap-y-5 flex-col">
          <h2>Список карточек</h2>
          <ul>
            {cardList.length < 1 && (
              <div>В этой колоде пока нет карточек...</div>
            )}
            {cardList.map((obj, i) => (
              <li
                key={i}
                className="flex border-amber-900 border-2 justify-between gap-x-8"
              >
                <div className="flex flex-col">
                  <div>eng: {obj.english_word}</div>
                  <div>ru: {obj.english_word}</div>
                  <div>image_url: {obj.image_url}</div>
                </div>
                <button
                  className="bg-red-400 rounded-[5px] h-[25px] w-[70px] my-auto"
                  onClick={() => {
                    deleteCard(obj);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <button
        className="mt-[200px]"
        onClick={async () => {
          await createDeck({
            title: "100 главных слов английского языка",
            user_id: 1,
            is_public: true,
            cards: cardList,
          });
        }}
      >
        Создать колоду
      </button> */}
    </main>
  );
}

// const deck = {
//   deck_id: 1, //автоматически давался при создании deck в postgresql
//   title: "100 главных слов английского языка",
//   user_id: 1,
//   is_public: true,
//   cards: [
//     {
//       image_url: "example.com",
//       english_word: "dog",
//       russian_word: "собака",
//     },

//     {
//       image_url: "example.com",
//       english_word: "cat",
//       russian_word: "кошка",
//     },
//   ],
// };
