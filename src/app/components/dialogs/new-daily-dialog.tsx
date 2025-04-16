"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/lib/shadcdn/components/ui/dialog";
import React from "react";

import { Button } from "@/src/lib/shadcdn/components/ui/button";
import { redirect } from "next/navigation";
import { v4 } from "uuid";

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  date: Date;
};

export const NewDailyDialog = ({ isOpen, closeDialog }: Props) => {
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
          <DialogDescription
            asChild
            className="text-sm text-gray-400 mb-6"
          ></DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button onClick={start} className="cursor-pointer">
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
