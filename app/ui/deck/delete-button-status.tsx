"use client";

import { useFormStatus } from "react-dom";

export function DeleteButtonStatus() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50  "
      aria-label={pending ? "Идёт удаление..." : "Удалить"}
    >
      {pending ? (
        <label className="flex flex-nowrap w-[30px] h-[30px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="animate-pulse opacity-100 h-[30px] w-[30px] hover:opacity-80 transition-opacity text-error dark:text-dark-error "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </label>
      ) : (
        <label className="flex flex-nowrap w-[30px] h-[30px] cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" opacity-50 h-[30px] w-[30px] hover:opacity-80 transition-opacity text-error dark:text-dark-error "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </label>
      )}
    </button>
  );
}

// Дополнительный компонент спиннера
function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
