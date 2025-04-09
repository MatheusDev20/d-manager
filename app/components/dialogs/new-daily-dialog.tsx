"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { v4 } from "uuid";

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  data: { day: Date; begin: Date };
};

export const NewDailyDialog = ({ isOpen, closeDialog, data }: Props) => {
  const { day, begin } = data;
  const start = () => {
    const id = v4();
    redirect(`/daily?id=${id}`);
  };
  return (
    <Dialog onOpenChange={closeDialog} open={isOpen}>
      <DialogContent className="p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl self-center font-bold mb-4">
            Iniciar Daily
          </DialogTitle>
          <DialogDescription asChild className="text-sm text-gray-400 mb-6">
            <div className="flex flex-col gap-2">
              <div>
                <span className="font-semibold">Data:</span>{" "}
                {format(day, "dd/MM/yyyy")}
              </div>
              <div>
                <span className="font-semibold">Hora de início:</span>{" "}
                {format(begin, "HH:mm")}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button onClick={start} className="cursor-pointer ">
            Iniciar
          </Button>
          <Button
            className="cursor-pointer "
            variant="ghost"
            onClick={closeDialog}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
