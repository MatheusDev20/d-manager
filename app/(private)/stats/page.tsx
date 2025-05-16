/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Daily, StatsGeneralMetris } from "@/app/@types";
import { AppSelect } from "@/app/components/select/app-select";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/lib/shadcdn/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/app/lib/shadcdn/components/ui/tabs";
import {
  calcTotalTasksCreated,
  calculateAverageDailyDuration,
} from "@/app/utils/math";
import { useQuery } from "@tanstack/react-query";
import { formatISO, subDays } from "date-fns";
import { AlarmClockCheck, BadgeAlert, CheckCheck } from "lucide-react";

const supportedTimeRanges = [
  { value: "last-7", label: "Últimos 7 dias" },
  { value: "last-15", label: "Últimos 15 dias" },
  { value: "last-30", label: "Últimos 30 dias" },
];

const data = [
  { title: "Duração Total", icon: <AlarmClockCheck />, data: {} },
  { title: "Pendências Adicionadas", icon: <BadgeAlert />, data: {} },
  { title: "Pendências resolvidas", icon: <CheckCheck />, data: {} },
] as StatsGeneralMetris[];

export default function Page() {
  const {
    data: fetchedDailys,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: async (): Promise<Daily[]> => {
      const now = formatISO(new Date());
      const fiveDaysAgo = formatISO(subDays(new Date(), 50));

      const response = await fetch(
        `/api/daily?start=${fiveDaysAgo}&end=${now}`,
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const { data: serializedData } = await response.json();
      return serializedData as Daily[];
    },
  });

  const calculateGeneralMetrics = (
    dataToComplete: StatsGeneralMetris[],
    dailys: Daily[] | undefined,
  ) => {
    if (!dailys) return dataToComplete;
    const ouput = dataToComplete.map((each) => {
      const map = {
        "Duração Total": calculateAverageDailyDuration,
        "Pendências Adicionadas": calcTotalTasksCreated,
        "Pendências resolvidas": () => "-",
      } as Record<any, any>;

      const calcFn = map[each.title];
      return {
        ...each,
        data: { value: calcFn(dailys) },
      };
    });

    return ouput;
  };

  const display = calculateGeneralMetrics(data, fetchedDailys);
  if (error) {
    return null;
  }

  if (isLoading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="flex h-full flex-col p-6">
      <header className="w-full flex gap-4 justify-between items-center p-4">
        <h1 className="font-bold text-[28px]">Estatísticas</h1>
        <AppSelect
          name="timeRange"
          disabled
          defaultValue="last-7"
          placeholder="Definir Intervalo"
          options={supportedTimeRanges}
          className="w-[25%] cursor-pointer"
          groupLabel="Desenvolvedores"
        />
      </header>

      <main className="flex-1 h-full pl-4 pr-4 pt-8 flex flex-col">
        <Tabs
          defaultValue="overview"
          className="w-full cursor-pointer mb-12 space-y-4 "
        >
          <TabsList className="h-[46px] min-w-[30%] rounded-lg">
            <TabsTrigger className="font-semibold" value="overview">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="idk" disabled>
              Não sei
            </TabsTrigger>
            <TabsTrigger value="idk" disabled>
              Não sei 2
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex justify-between items-stretch gap-6">
          {display.map((each, i) => (
            <Card
              key={i}
              className="flex-1 h-40 rounded-lg p-6 border-gray-700 shadow-md"
            >
              <CardHeader className="text-gray-200 font-bold 2xl:text-2xl text-xs">
                <div className="flex items-center gap-4">
                  <span className="text-blue-400">{each.icon}</span>{" "}
                  {each.title}
                </div>
              </CardHeader>
              <CardContent className="text-white text-lg font-bold mt-2">
                {each.data.value}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
