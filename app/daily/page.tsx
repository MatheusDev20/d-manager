import { Input } from "@/components/ui/input";
import { format } from "date-fns";

export default function Page() {
  const initialDate = new Date();
  return (
    <main className="md:p-8 p-3">
      <header className="w-full min-h-[42px]">
        <div className="flex flex-col gap-3 p-2 items-center justify-self-end">
          <span className="min-w-24 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
            Ínicio
          </span>
          <Input
            className="w-24 text-center"
            disabled
            value={format(initialDate, "HH:mm")}
          />
        </div>
      </header>
    </main>
  );
}
