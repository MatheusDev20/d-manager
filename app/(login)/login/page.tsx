"use client";
import { useState } from "react";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";

type SignInType = "signIn" | "signUp";

export default function Page() {
  const [formType, setFormType] = useState<SignInType>("signIn");

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-gradient-to-b">
      {formType === "signIn" ? (
        <SignIn setFormType={setFormType} />
      ) : (
        <SignUp setFormType={setFormType} />
      )}
    </div>
  );
}
