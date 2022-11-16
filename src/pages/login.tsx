import { Button } from "components/ui/button";
import { signIn } from "next-auth/react";
import { Github } from "react-bootstrap-icons";

export default function LoginPage() {
  function handleLoginClick() {
    signIn("github", { redirect: true, callbackUrl: "/" });
  }

  return (
    <>
      <header>
        <h1 className="text-4xl font-serif">Login</h1>
        <p className="mt-3 text-neutral-300">
          Login to continue to manage your expenses, income and subscriptions
        </p>
      </header>

      <div className="mt-4">
        <Button onClick={handleLoginClick} className="flex items-center gap-2">
          <Github />
          Login via GitHub
        </Button>
      </div>
    </>
  );
}
