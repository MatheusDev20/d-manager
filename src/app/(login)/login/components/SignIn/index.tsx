"use client";

import { GithubIcon } from "@/src/app/components/icons/github";
import { login } from "@/src/app/server-actions/auth-functions";
import { Button } from "@/src/components/ui/button";

export const SignIn = () => {
  return (
    <div className="flex items-center justify-center flex-col h-screen bg-gradient-to-b">
      <div className="rounded-xl flex flex-col bg-gray-800/40 backdrop-blur-sm border border-gray-700 shadow-xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Bem vindo!
        </h1>
        <Button
          className="w-[100%] transition-all cursor-pointer self-center duration-300 flex items-center justify-center gap-3 py-6 px-8 rounded-lg bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-500 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
          variant="outline"
          onClick={() => login()}
        >
          <GithubIcon tClass="h-7 w-7" />
          <span className="text-lg font-medium">Continue with GitHub</span>
        </Button>

        <p className="mt-6 text-gray-400 text-sm text-center">
          We may support other login providers and methods in the future
        </p>
      </div>
    </div>
  );
};
