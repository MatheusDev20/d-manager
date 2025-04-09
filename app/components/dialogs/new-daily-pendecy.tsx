/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { AppSelect } from "../select/app-select";
import { Developer } from "@/app/@types";
import { Button } from "@/components/ui/button";
import { create } from "@/app/server-actions/developers";

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  developer: Developer;
};

export const NewPendecy = ({ isOpen, closeDialog, developer }: Props) => {
  return (
    <Dialog onOpenChange={closeDialog} open={isOpen}>
      <DialogContent className="min-h-[300px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold mb-8">
            Nova pendência
            {/* <span className="text-green-200 ml-2">{developer.name}</span> */}
          </DialogTitle>
          <DialogDescription
            asChild
            className="text-sm flex items-center justify-center text-gray-400 mb-6"
          >
            <PendencyForm dev={developer} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const PendencyForm = ({ dev }: { dev: Developer }) => {
  const [formState, setFormState] = useState({
    description: "",
    customer: "",
    priority: "",
  });

  const submitForm = (devId: number, formState: any) => {
    create({ devId, formData: { ...formState, status: "Pendente" } });
  };

  const handleAnyChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="flex flex-col gap-8">
      <div>
        <label htmlFor="description" className="text-sm font-medium">
          Desenvolvedor
        </label>
        <AppSelect
          name="devId"
          options={[{ label: dev.name, value: String(dev.id) }]}
          disabled
          defaultValue={String(dev.id)}
          groupLabel="Desenvolvedores"
        />
      </div>
      <div>
        <label htmlFor="description" className="text-sm font-medium">
          Descrição
        </label>
        <Input
          name="description"
          onChange={handleAnyChange}
          className="mt-3"
          placeholder="Configuração de VPN do cliente..."
        />
      </div>
      <div className="flex gap-3">
        <div className="w-[50%]">
          <label htmlFor="description" className="text-sm font-medium">
            Cliente de Impacto (Opcional)
          </label>
          <Input
            name="customer"
            className="mt-3"
            onChange={handleAnyChange}
            placeholder="Icatu, Magalu..."
          />
        </div>
        <div className="w-[50%]">
          <label htmlFor="description" className="text-sm font-medium">
            Prioridade
          </label>
          <AppSelect
            name="priority"
            groupLabel="Prioridade"
            placeholder="Prioridade"
            onChange={(value: string) => {
              setFormState({ ...formState, priority: value });
            }}
            options={[
              { value: "low", label: "Baixo" },
              { value: "high", label: "Alto" },
              { value: "medium", label: "Médio" },
            ]}
          />
        </div>
      </div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          submitForm(dev.id, formState);
        }}
        className="md:w-[50%] self-end cursor-pointer"
      >
        Adicionar
      </Button>
    </form>
  );
};
