import { auth, signIn, signOut } from "@/auth";

export default async function SignIn() {
  const session = await auth();
  console.log(session);
  const user = session?.user;
  return user ? (
    <>
      <div className="flex flex-nowrap gap-x-10 pb-[100px]">
        {user.image && (
          <img
            className="rounded-full h-[50px]"
            src={user.image}
            alt="user avatar"
          />
        )}
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          className="cursor-pointer bg-dark-primary dark:bg-dark-primary text-text dark:text-dark-text rounded-md px-[20px] py-[10px] opacity-80 hover:opacity-100"
          type="submit"
        >
          Sign Out
        </button>
      </form>
    </>
  ) : (
    <>
      <h1>Вы не авторизованы, нажмите кнопку ниже, чтобы авторизоваться.</h1>
      <form
        action={async () => {
          "use server";
          await signIn("google", {
            redirectTo: "/secret",
          });
        }}
      >
        <button className="cursor-pointer" type="submit">
          Signin with Google
        </button>
      </form>
    </>
  );
}
