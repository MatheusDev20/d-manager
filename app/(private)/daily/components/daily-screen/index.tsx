"use client";

import { Accordion } from "@/app/lib/shadcdn/components/ui/accordion";

import React from "react";
import { NewPendecy } from "../add-new-task";
import { Developer } from "@/app/@types";
import { doneTask, updateAction } from "@/app/server/actions/tasks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { DeveloperTasks } from "../task";

export type UpdateTaskData = {
  taskId: string;
  description: string;
  priority: string;
  deadline?: string;
};
type Props = {
  developers: Developer[];
  tasksCreated: number;
  setTaksCreated: React.Dispatch<React.SetStateAction<number>>;
};
export const DailyScreen = ({ developers, setTaksCreated }: Props) => {
  const queryClient = useQueryClient();

  const [newPendecy, setNewPendecy] = React.useState({
    openModal: false,
    developer: {} as Developer,
  });

  const addNewPendecy = (developer: Developer) => {
    setNewPendecy({ openModal: true, developer });
    setTaksCreated((prev) => prev + 1);
  };

  const updateTask = async (data: UpdateTaskData) => {
    await updateAction(data);
    await queryClient.invalidateQueries({ queryKey: ["developers"] });
    toast.success("Pendência atualizada com sucesso!", {
      position: "top-right",
      duration: 5000,
      richColors: true,
    });
  };

  const markAsSolved = async (taskId: string) => {
    await doneTask(taskId);

    await queryClient.invalidateQueries({ queryKey: ["developers"] });
    toast.success("Pendência marcada como resolvida", {
      position: "top-right",
      duration: 5000,
      richColors: true,
    });
  };

  if (developers.length === 0 || !developers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold">Nenhum desenvolvedor encontrado</p>
      </div>
    );
  }
  return (
    <div className="p-6 w-full">
      <NewPendecy
        closeDialog={() =>
          setNewPendecy({ openModal: false, developer: {} as Developer })
        }
        isOpen={newPendecy.openModal}
        developer={newPendecy.developer}
      />
      <Accordion type="single" collapsible>
        {developers.map((developer) => (
          <DeveloperTasks
            updateTask={updateTask}
            addTask={addNewPendecy}
            solveTask={markAsSolved}
            developer={developer}
            key={developer.id}
          />
        ))}
      </Accordion>
    </div>
  );
};
