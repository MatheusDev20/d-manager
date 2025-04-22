"use client";

import { AppInput } from "@/app/components/input";
import { Button } from "@/app/lib/shadcdn/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/lib/shadcdn/components/ui/card";
import { Input } from "@/app/lib/shadcdn/components/ui/input";
import { useState } from "react";

type Props = {
  setFormType: (type: "signIn" | "signUp") => void;
};

type FormProps = {
  email: string;
  password: string;
  name: string;
};
export const SignUp = ({ setFormType }: Props) => {
  const [formData, setFormData] = useState<FormProps>({
    email: "",
    password: "",
    name: "",
  });

  console.log("FormData", formData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-gradient-to-b">
      <Card className="min-w-[520px] flex flex-col bg-gray-800/40 backdrop-blur-sm border border-gray-700 shadow-xl p-8">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-bold text-white mb-6 text-center">
              Criar usuário
            </h1>
          </CardTitle>
          <CardContent className="pt-6 pb-6 gap-8 flex flex-col">
            <AppInput
              bg="bg-background"
              className="p-6"
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Nome de usuário..."
            />

            <AppInput
              bg="bg-background"
              className="p-6"
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Passowrd..."
            />
            <Input
              name="password"
              bg="bg-background"
              className="p-6 text-white"
              type="password"
              onChange={handleChange}
              placeholder="Senha..."
            />
            <Button className="mt-4 cursor-pointer">Criar usuário</Button>
            <CardFooter className="flex pl-0 pr-0 pt-2 pb-2 items-center">
              <a
                onClick={() => setFormType("signIn")}
                className="text-[14px] cursor-pointer text-blue-400"
              >
                Fazer Login
              </a>
            </CardFooter>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};
