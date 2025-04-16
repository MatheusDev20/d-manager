import { Daily } from "@/src/@types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/lib/shadcdn/components/ui/dialog";

import React from "react";

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  daily: Daily | null;
  date: Date;
};

export const DetailsDailyDialog = ({ isOpen, daily, closeDialog }: Props) => {
  return (
    <Dialog onOpenChange={closeDialog} open={isOpen}>
      <DialogContent className="p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl self-center font-bold mb-4">
            {!daily ? "Não encontrada" : "Daily já realizada"}
          </DialogTitle>
          <DialogDescription
            asChild
            className="text-sm flex items-center justify-center text-gray-400 mb-6"
          >
            {!daily ? (
              <p>
                Não foram encontradas informações para a daily do dia
                selecionado!
              </p>
            ) : (
              <div className="flex gap-3 flex-col">
                <p>Você já realizou essa Daily!</p>
                <p className="text-green-300">DailyID : {daily.id}</p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
