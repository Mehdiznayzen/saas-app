
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

const SignInPage = () => {
  return (
    <main className="flex items-center justify-center">
      <Suspense 
        fallback={<div>Chargement...</div>}
      >
        <SignIn />
      </Suspense>
    </main>
  );
};

export default SignInPage;
