import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { Developer } from "../daily/team";
import { Input } from "@/components/ui/input";
import { AppSelect } from "../select/app-select";
import { developers } from "@/app/team/page";

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
  const allDevs = developers.map((dev) => ({
    value: String(dev.id),
    label: dev.name,
  }));

  return (
    <form className="flex flex-col gap-8">
      <div>
        <label htmlFor="description" className="text-sm font-medium">
          Desenvolvedor
        </label>
        <AppSelect
          options={allDevs}
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
          className="mt-3"
          placeholder="Configuração de VPN do cliente..."
        />
      </div>
      <div className="flex gap-3">
        <div className="w-[50%]">
          <label htmlFor="description" className="text-sm font-medium">
            Cliente de Impacto (Opcional)
          </label>
          <Input className="mt-3" placeholder="Icatu, Magalu..." />
        </div>
        <div className="w-[50%]">
          <label htmlFor="description" className="text-sm font-medium">
            Prioridade
          </label>
          <AppSelect
            groupLabel="Prioridade"
            placeholder="Prioridade"
            options={[
              { value: "low", label: "Baixo" },
              { value: "high", label: "Alto" },
              { value: "medium", label: "Médio" },
            ]}
          />
        </div>
      </div>
    </form>
  );
};
