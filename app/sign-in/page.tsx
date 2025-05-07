import { Suspense } from "react";
import SignInForm from "../ui/auth/sign-in-form";
import { addNick } from "../lib/actions";

export default async function Page() {
  return (
    <div className="flex justify-center h-dvh">
      <Suspense>
        <SignInForm />
      </Suspense>
    </div>
  );
}
