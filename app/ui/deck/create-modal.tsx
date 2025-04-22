import { createDeck } from "@/app/lib/actions";

export default async function CreateModal() {
  return (
    <form
      action={createDeck}
      className="
      flex justify-start items-start flex-col gap-y-[20px]
      pt-[40px] p-[20px]
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[400px] h-[400px] bg-blue-100"
    >
      <h2 className="mx-auto">Создать колоду</h2>
      <label htmlFor="user_id" className="flex flex-nowrap gap-x-[10px]">
        id пользователя:{" "}
        <input
          className="bg-blue-200 rounded-2xl"
          type="text"
          id="user_id"
          name="user_id"
        />
      </label>

      <label htmlFor="title" className="flex flex-nowrap gap-x-[10px]">
        название колоды:{" "}
        <input
          className="bg-blue-200 rounded-2xl"
          type="text"
          id="title"
          name="title"
        />
      </label>
      <label htmlFor="is_public" className="flex flex-nowrap gap-x-[10px]">
        Колода видна всем пользователям:
        <input type="checkbox" name="is_public" id="is_public" />
      </label>
      <button
        className="
      cursor-pointer hover:bg-blue-500 transition-colors
      w-[100%] h-[50px] bg-blue-400 rounded-2xl"
      >
        Создать
      </button>
    </form>
  );
}
