import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/");
  return session ? (
    <>
      <div>Welcome to secret! you are authenticated</div>
    </>
  ) : (
    <>
      <h1>You are not authenticated</h1>
    </>
  );
}
