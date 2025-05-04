"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/decks";
  // const [errorMessage, formAction, isPending] = useActionState(
  //   authenticate,
  //   undefined
  // );

  return (
    <form
    // action={formAction}
    >
      <div className="flex flex-col gap-y-[20px] items-end">
        <label htmlFor="nick" className="">
          ник:
          <input
            className="border-text dark:border-dark-text  border-2 rounded-sm ml-[10px]"
            type="text"
            id="nick"
            name="nick"
            minLength={6}
            required
          />
        </label>
        <label htmlFor="email">
          ваш E-Mail:{" "}
          <input
            className="border-text dark:border-dark-text  border-2 rounded-sm ml-[10px]"
            type="email"
            id="email"
            name="email"
            required
          />
        </label>
        <label htmlFor="password">
          пароль:{" "}
          <input
            className="border-text dark:border-dark-text  border-2 rounded-sm ml-[10px]"
            type="password"
            id="password"
            name="password"
            minLength={6}
            required
          />
        </label>
        <label htmlFor="replace_password">
          повторите пароль:
          <input
            className="border-text dark:border-dark-text  border-2 rounded-sm ml-[10px]"
            type="password"
            id="replace_password"
            name="replace_password"
            minLength={6}
            required
          />
        </label>

        <button
          type="submit"
          className="border-text dark:border-dark-text w-full  border-2 rounded-sm ml-[10px] p-2 hover:opacity-80 cursor-pointer"
          // aria-disabled={isPending}
        >
          Создать аккаунт
        </button>
      </div>
    </form>
  );
}
