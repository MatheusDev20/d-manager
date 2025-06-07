"use client";

import { Daily, StatsGeneralMetris } from "@/app/@types";
import { AppSelect } from "@/app/components/select/app-select";
import { Button } from "@/app/lib/shadcdn/components/ui/button";
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
import { TabsContent } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { formatISO, subDays } from "date-fns";
import { AlarmClockCheck, BadgeAlert, CheckCheck } from "lucide-react";
import { useState } from "react";
type TimeRange = {
  value: string;
  label: string;
};

const supportedTimeRanges = [
  { value: "7", label: "Últimos 7 dias" },
  { value: "15", label: "Últimos 15 dias" },
  { value: "30", label: "Últimos 30 dias" },
];

const data = [
  {
    title: "Média de duração",
    icon: <AlarmClockCheck />,
    data: {},
    calc: calculateAverageDailyDuration,
  },
  {
    title: "Total de pendências adicionadas",
    icon: <BadgeAlert />,
    data: {},
    calc: calcTotalTasksCreated,
  },
  {
    title: "Pendências resolvidas",
    icon: <CheckCheck />,
    data: {},
    calc: () => "-",
  },
] as StatsGeneralMetris[];

export default function Page() {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    label: "Últimos 7 dias",
    value: "7",
  });

  const {
    data: fetchedDailys,
    error,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: async (): Promise<Daily[]> => {
      const now = formatISO(new Date());
      const fiveDaysAgo = formatISO(
        subDays(new Date(), Number(timeRange.value)),
      );

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
    const output = dataToComplete.map((each) => {
      return {
        ...each,
        data: { value: each.calc(dailys) },
      };
    });

    return output;
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
        <div className="flex w-1/2 gap-2">
          <div className="w-full flex items-end justify-end gap-6">
            <AppSelect
              name="timeRange"
              defaultValue={timeRange.value}
              placeholder="Definir Intervalo"
              options={supportedTimeRanges}
              onChange={(value) => {
                const selectedRange = supportedTimeRanges.find(
                  (option) => option.value === value,
                );
                if (selectedRange) {
                  setTimeRange(selectedRange);
                }
              }}
              className="w-[30%] cursor-pointer"
              groupLabel="Intervalos"
            />
            <Button
              onClick={() => refetch()}
              className="cursor-pointer text-black font-semibold bg-accent-foreground"
            >
              Aplicar
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 h-full pl-4 pr-4 pt-8 flex flex-col">
        <Tabs
          defaultValue="overview"
          className="w-full cursor-pointer mb-12 space-y-4 "
        >
          <TabsList className="h-[46px] gap-2 min-w-[30%] rounded-lg">
            <TabsTrigger className="font-semibold" value="overview">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger className="font-semibold" value="customers">
              Clientes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="flex-1 mt-3">
            <div className="flex justify-between items-stretch gap-6">
              {display.map((each, i) => (
                <Card
                  key={i}
                  className="flex-1 h-40 rounded-lg p-6 border-gray-700 shadow-md"
                >
                  <CardHeader className="text-gray-200 font-bold text-lg">
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
          </TabsContent>
          <TabsContent value="customers" className="flex-1 mt-3"></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
