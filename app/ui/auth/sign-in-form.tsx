import Link from "next/link";

export default async function SignInForm() {
  return (
    <form>
      <div className="flex flex-col justify-start items-end gap-y-[40px]">
        <label htmlFor="login">
          логин:
          <input
            className="border-text dark:border-dark-text  border-2 rounded-sm ml-[10px]"
            type="text"
            id="login"
            name="login"
            minLength={6}
            required
          />
        </label>
        <label htmlFor="user_password">
          пароль:{" "}
          <input
            type="password"
            className="border-text dark:border-dark-text  border-2 rounded-sm ml-[10px]"
            required
          />
        </label>
        <button
          type="submit"
          className="border-text dark:border-dark-text w-full  border-2 rounded-sm ml-[10px] p-2 hover:opacity-80 cursor-pointer"
        >
          Войти
        </button>
        <div>
          Нет аккаунта? &nbsp;
          <Link href="/sign-up" className="border-b-2">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </form>
  );
}
