/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { AppSelect } from "../../../components/select/app-select";
import { Developer } from "@/app/@types";
import { Button } from "@/components/ui/button";
import { create } from "@/app/server-actions/developers";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
            <PendencyForm closeDialog={closeDialog} dev={developer} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

type Form = {
  customer: string;
  priority: string;
  description: string;
};
const PendencyForm = ({
  dev,
  closeDialog,
}: {
  dev: Developer;
  closeDialog: any;
}) => {
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState<Form>({
    description: "",
    customer: "",
    priority: "",
  });

  const submitForm = async (devId: number, formState: Form) => {
    await create({ devId, formData: { ...formState, status: "Pending" } });
    queryClient.invalidateQueries({ queryKey: ["developers"] });

    closeDialog();
    toast.success("Pendência criada com sucesso!", {
      position: "top-right",
      duration: 5000,
      richColors: true,
    });
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
        /* Customer is optional */
        disabled={Object.values({
          description: formState.description,
          priority: formState.priority,
        }).some((value) => !value)}
        className="md:w-[50%] self-end cursor-pointer"
      >
        Adicionar
      </Button>
    </form>
  );
};
