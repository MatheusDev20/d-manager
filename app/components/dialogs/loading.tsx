import { DialogHeader } from "@/app/lib/shadcdn/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/app/lib/shadcdn/components/ui/dialog";
import { Progress } from "@/app/lib/shadcdn/components/ui/progress";

type Props = {
  isOpen: boolean;
  progress: number;
};
export const LoadingProgressDialog = ({ isOpen, progress }: Props) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl self-center font-bold mb-4">
            Finalizando...
          </DialogTitle>
          <DialogDescription asChild className=" mb-6">
            <Progress value={progress} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
