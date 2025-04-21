// /app/ui/deck/delete-button.tsx
"use client";

import { deleteDeck } from "@/app/lib/actions";
import { DeleteButtonStatus } from "./delete-button-status";

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

      <DeleteButtonStatus />
    </form>
  );
}
