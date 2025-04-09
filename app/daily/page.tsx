"use client";
import { Input } from "@/components/ui/input";
import { add, format, formatDate } from "date-fns";
import { Team } from "../components/daily/team";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const initialDate = new Date();
  const endDate = add(initialDate, { minutes: 30 });

  const { data, isLoading } = useQuery({
    queryKey: ["developers"],
    queryFn: async () => {
      const response = await fetch("/api/developers");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="md:p-8 p-3 flex flex-col justify-between">
      <header className="p-2 flex min-h-[42px] gap-12 border-b border-gray-500">
        <h1 className="text-lg font-bold self-center text-gray-700 dark:text-gray-300">
          Daily {formatDate(initialDate, "dd/MM/yyyy")}
        </h1>
        <div className="flex gap-3 p-2 justify-self-end">
          <span className="min-w-24 text-center mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Ínicio
          </span>
          <Input
            className="w-24 text-center"
            disabled
            value={format(initialDate, "HH:mm")}
          />
        </div>
        <div className="flex gap-3 p-2 justify-self-end">
          <span className="min-w-24 text-center mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Previsão de término
          </span>
          <Input
            className="w-24 text-center"
            disabled
            value={format(endDate, "HH:mm")}
          />
        </div>
      </header>
      <div className="flex-1">{data && <Team developers={data} />}</div>
    </main>
  );
}
