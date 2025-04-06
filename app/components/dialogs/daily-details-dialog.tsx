import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
};

export const DetailsDailyDialog = ({ isOpen, closeDialog }: Props) => {
  return (
    <Dialog onOpenChange={closeDialog} open={isOpen}>
      <DialogContent className="p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl self-center font-bold mb-4">
            DailyRealizada
          </DialogTitle>
          <DialogDescription
            asChild
            className="text-sm flex items-center justify-center text-gray-400 mb-6"
          >
            <div>Você já realizou essa Daily, clique para ver detalhes</div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
