import { deleteDeck } from "@/app/lib/actions";

export function DeleteButton({
  deckId,
  userId,
  title,
}: {
  deckId: number;
  userId: number;
  title: string;
}) {
  return (
    <form action={deleteDeck} className="inline">
      <input type="hidden" name="deck_id" value={deckId} />
      <input type="hidden" name="user_id" value={userId} />
      <input type="hidden" name="title" value={title} />

      <button
        type="submit"
        className="text-red-600 hover:text-red-800 transition-colors"
        aria-label={`Удалить колоду ${title}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
      </button>
    </form>
  );
}
