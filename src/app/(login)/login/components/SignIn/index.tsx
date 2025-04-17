"use client";

import { AppInput } from "@/src/app/components/input";
import { LoadingSpinner } from "@/src/app/components/spinner";
import { signin } from "@/src/app/server/actions/auth";
import { isEmailValid } from "@/src/app/utils/utils";
import { Button } from "@/src/lib/shadcdn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/lib/shadcdn/components/ui/card";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  setFormType: (type: "signIn" | "signUp") => void;
};

export const SignIn = ({ setFormType }: Props) => {
  const [state, action, pending] = useActionState(signin, {
    errors: { message: "" },
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkEmailError = () => {
    return !!loginData.email && !isEmailValid(loginData.email);
  };

  const checkPasswordError = () => {
    return loginData.password.length < 8;
  };

  const isFormValid = () => {
    return (
      checkEmailError() ||
      checkPasswordError() ||
      loginData.email.length === 0 ||
      loginData.password.length === 0
    );
  };

  useEffect(() => {
    if (state?.errors && state.errors.message)
      toast.error("Email não encontrado!", {
        position: "top-right",
        richColors: true,
      });
  }, [state]);

  return (
    <form
      action={action}
      className="flex items-center justify-center flex-col h-screen bg-gradient-to-b"
    >
      <Card className="min-w-[520px] flex flex-col bg-gray-800/40 backdrop-blur-sm border border-gray-700 shadow-xl p-8">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-bold text-white mb-6 text-center">
              Bem vindo!
            </h1>
          </CardTitle>
          <CardDescription className="flex items-center justify-center">
            <span className="text-center">Insira seus dados para entrar</span>
          </CardDescription>
          <CardContent className="pt-6 pb-6 gap-8 flex flex-col">
            <AppInput
              name="email"
              value={loginData.email}
              errorMsg="Email Inválido"
              checkError={checkEmailError}
              bg="bg-background"
              className="p-6"
              onChange={handleChange}
              placeholder="Email..."
            />
            <AppInput
              value={loginData.password}
              name="password"
              bg="bg-background"
              className="p-6 text-white"
              type="password"
              onChange={handleChange}
              placeholder="Senha..."
            />
            <Button
              className="mt-4 cursor-pointer"
              disabled={isFormValid()}
              type="submit"
            >
              {pending ? <LoadingSpinner sizeClass="h-4 w-4" /> : "Entrar"}
            </Button>
            <CardFooter className="flex pl-0 pr-0 pt-2 pb-2 items-center">
              <a
                onClick={() => setFormType("signUp")}
                className="text-[14px] cursor-pointer text-blue-300"
              >
                Criar conta
              </a>
            </CardFooter>
          </CardContent>
        </CardHeader>
      </Card>
    </form>
  );
};
