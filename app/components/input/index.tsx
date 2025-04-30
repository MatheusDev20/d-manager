import { Input } from "@/app/lib/shadcdn/components/ui/input";
import { cn } from "../../utils/utils";
import { CircleAlert } from "lucide-react";

type Props = {
  bg?: string;
  className?: string;
  checkError?: () => boolean;
  width?: string;
  errorMsg?: string;
} & React.ComponentProps<"input">;

export const AppInput = ({
  bg,
  className,
  checkError,
  errorMsg,
  width,
  ...rest
}: Props) => {
  return (
    <div className={`flex flex-col space-y-1 ${width ?? ""}`}>
      <Input
        {...rest}
        bg={bg}
        className={cn(
          className,
          checkError &&
            checkError() &&
            "border-red-300 border-2 focus-visible:ring-red-300 pr-4",
        )}
      />
      {checkError && checkError() && (
        <div className="flex items-center gap-1.5 mt-1">
          <CircleAlert className="h-4 w-4 text-red-300 flex-shrink-0" />
          <p className="text-sm text-red-300 font-medium">{errorMsg}</p>
        </div>
      )}
    </div>
  );
};
