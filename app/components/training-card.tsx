"use client";

import { useState } from "react";
import { Card } from "../lib/definitions";

export default function TrainingCard({ cards }: { cards: Card[] }) {
  const [show, setShow] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speakText = (text: string) => {
    // Проверяем поддержку API в браузере
    if ("speechSynthesis" in window) {
      // Останавливаем текущее воспроизведение, если есть
      window.speechSynthesis.cancel();

      // Создаем новый экземпляр SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance(text);

      // Настраиваем параметры речи
      utterance.lang = show ? "ru-RU" : "en-US"; // Выбираем язык в зависимости от состояния
      utterance.rate = 1; // Скорость речи (1 - нормальная)

      // Обработчики событий
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      // Запускаем синтез речи
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Ваш браузер не поддерживает озвучивание текста");
    }
  };

  const goNext = () => {
    setShow(false);
    window.speechSynthesis?.cancel();
    if (current < cards.length - 1) {
      setCurrent(current + 1);
    }
    if (current == cards.length - 1) {
      setCurrent(0);
    }
  };
  const goPrev = () => {
    setShow(false);
    window.speechSynthesis?.cancel();
    if (current > 0) {
      setCurrent(current - 1);
    }
    if (current == 0) {
      setCurrent(cards.length - 1);
    }
  };
  return (
    <div className="grid grid-rows-1 grid-cols-1 justify-items-center">
      <div className=" flex flex-col items-center justify-end p-[20px] gap-y-[25px] max-w-[400px] rounded-2xl bg-blue-100 px-[100px]">
        {cards[current].image_url && (
          <div className="w-[100%] h-[150px] ">
            <img
              className="w-[100%] h-[100%] object-cover"
              src={cards[current].image_url}
              alt=""
            />
          </div>
        )}
        {/* текст внутри этого div нужно озвучивать, как видишь там два текста в зависимости от состояния show, там текст на английском в cards.front и на русском в cards.back */}
        <div
          onClick={() =>
            speakText(show ? cards[current].back : cards[current].front)
          }
          className="text-center text-4xl font-bold flex justify-center items-center gap-x-[10px]"
        >
          <div className="flex items-center justify-center">
            {show ? cards[current].back : cards[current].front}
          </div>
          <button
            onClick={() =>
              speakText(show ? cards[current].back : cards[current].front)
            }
            className=" cursor-pointer  "
            disabled={isSpeaking}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isSpeaking ? "#4ab6c7" : "currentColor"}
              className="w-6 h-6"
            >
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
              <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
            </svg>
          </button>
        </div>

        <button
          className="cursor-pointer text-2xl"
          onClick={() => setShow(!show)}
        >
          Показать
        </button>
        <div className="flex justify-between items-center gap-[30px]">
          {/* like */}
          <button className="w-[50px] h-[50px] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#3dff54"
              viewBox="0 0 32 32"
            >
              <path
                d="M27 11h-8.52L19 9.8A6.42 6.42 0 0 0 13 1a1 1 0 0 0-.93.63L8.32 11H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h18.17a3 3 0 0 0 2.12-.88l3.83-3.83a3 3 0 0 0 .88-2.12V14a3 3 0 0 0-3-3zM4 28V14a1 1 0 0 1 1-1h3v16H5a1 1 0 0 1-1-1zm24-3.83a1 1 0 0 1-.29.71l-3.83 3.83a1.05 1.05 0 0 1-.71.29H10V12.19l3.66-9.14a4.31 4.31 0 0 1 3 1.89 4.38 4.38 0 0 1 .44 4.12l-1 2.57A1 1 0 0 0 17 13h10a1 1 0 0 1 1 1z"
                data-name="thumb up android app aplication phone"
              />
            </svg>
          </button>
          {/* dislike */}
          <button className="w-[50px] h-[50px] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ff3b48"
              viewBox="0 0 32 32"
            >
              <path
                d="m29.12 5.71-3.83-3.83A3 3 0 0 0 23.17 1H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h3.32l3.75 9.37A1 1 0 0 0 13 31a6.42 6.42 0 0 0 6-8.8l-.52-1.2H27a3 3 0 0 0 3-3V7.83a3 3 0 0 0-.88-2.12zM4 18V4a1 1 0 0 1 1-1h3v16H5a1 1 0 0 1-1-1zm24 0a1 1 0 0 1-1 1H17a1 1 0 0 0-.93 1.37l1 2.57a4.38 4.38 0 0 1-.44 4.12 4.31 4.31 0 0 1-3 1.89L10 19.81V3h13.17a1 1 0 0 1 .71.29l3.83 3.83a1 1 0 0 1 .29.71z"
                data-name="thumb down android app aplication phone"
              />
            </svg>
          </button>
        </div>
        {/* navigate btns
         */}
        <div className="flex justify-between items-center gap-x-[25px]">
          {/* prev */}

          <button
            onClick={() => goPrev()}
            className="w-[40px] h-[40px] cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#4ab6c7"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <div>
            {current + 1} из {cards.length}
          </div>
          {/* next */}
          <button
            onClick={() => goNext()}
            className="w-[40px] h-[40px] cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#4ab6c7"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
