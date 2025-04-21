import { createDeck } from "@/app/lib/actions";

export default async function Page() {
  return (
    <div>
      <h1>Создайте колоду:</h1>
      <form action={createDeck}>
        <label htmlFor="title">
          название колоды:
          <input className="bg-white" type="text" id="title" name="title" />
        </label>
        <label htmlFor="user_id">
          id пользователя:
          <input className="bg-white" type="text" id="user_id" name="user_id" />
        </label>
        <label htmlFor="is_public">
          колода видна всем:
          <input type="checkbox" id="is_public" name="is_public" />
        </label>
        <button className="bg-green-400 rounded-2xl p-1.5" type="submit">
          создать колоду
        </button>
      </form>
    </div>
  );
}
