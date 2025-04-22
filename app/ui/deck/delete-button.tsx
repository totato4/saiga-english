// /app/ui/deck/delete-button.tsx
"use client";

import { deleteDeck } from "@/app/lib/actions";
import { DeleteButtonStatus } from "./delete-button-status";

export function DeleteButton({
  deck_id,
  user_id,
  title,
}: {
  deck_id: number;
  user_id: number;
  title: string;
}) {
  return (
    <form action={deleteDeck} className="">
      <input type="hidden" name="deck_id" value={deck_id} />
      <input type="hidden" name="user_id" value={user_id} />
      <input type="hidden" name="title" value={title} />

      <DeleteButtonStatus />
    </form>
  );
}
