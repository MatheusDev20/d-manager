/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Developer } from "@/app/@types";
import { AppInput } from "@/app/components/input";
import { AppSelect } from "@/app/components/select/app-select";
import { AppTooltip } from "@/app/components/tooltip";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/lib/shadcdn/components/ui/accordion";
import { Badge } from "@/app/lib/shadcdn/components/ui/badge";
import { Button } from "@/app/lib/shadcdn/components/ui/button";
import {
  getDateObj,
  pickPriorityColor,
  pickPriorityVariant,
} from "@/app/utils/utils";

import { BadgeCheck, Pencil, PlusIcon, X, ClockAlert } from "lucide-react";
import Image from "next/image";
import React from "react";
import { UpdateTaskData } from "../daily-screen";
import { InputPicker } from "@/app/components/picker";

type Props = {
  developer: Developer;
  solveTask?: (taskId: string) => Promise<void>;
  addTask?: (developer: Developer) => void;
  updateTask?: (data: UpdateTaskData) => Promise<void>;
};
export const DeveloperTasks = ({
  developer,
  solveTask,
  addTask,
  updateTask,
}: Props) => {
  const [isEditing, setIsEditing] = React.useState({
    taskId: "",
    isEditing: false,
  });

  const [editForm, setEditForm] = React.useState({
    description: "",
    priority: "",
    deadline: "",
  });

  const handleEditAction = (taskId: string, task: any) => {
    if (isEditing.taskId === taskId) {
      setIsEditing({
        taskId: "",
        isEditing: false,
      });

      setEditForm({
        description: "",
        priority: "",
        deadline: "",
      });
    } else {
      setIsEditing({
        taskId: taskId,
        isEditing: true,
      });
      setEditForm({
        description: task.description || "",
        priority: task.priority || "",
        deadline: task.deadline || "",
      });
    }
  };
  const handleChangeEditInputs = (
    e: React.ChangeEvent<HTMLInputElement> | string | any,
  ) => {
    if (typeof e === "string") {
      setEditForm({
        ...editForm,
        priority: e,
      });
      return;
    }

    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };
  const changeDeadline = (dt: Date) => {
    setEditForm({
      ...editForm,
      deadline: dt.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    });
  };

  const taskPriorityOptions = [
    { value: "low", label: "Baixo" },
    { value: "high", label: "Alto" },
    { value: "medium", label: "Médio" },
  ];

  const handleUpdateTask = async (taskId: string) => {
    if (updateTask)
      await updateTask({
        description: editForm.description,
        priority: editForm.priority,
        deadline: editForm.deadline,
        taskId,
      });

    setIsEditing({
      taskId: "",
      isEditing: false,
    });
  };
  return (
    <AccordionItem
      className="mt-3"
      key={developer.id}
      value={`developer-${developer.id}`}
    >
      <AccordionTrigger className="flex border w-full p-3 gap-4 mb-3 cursor-pointer hover:bg-gray-950 rounded-md">
        <div className="flex gap-6 md:gap-12 items-center">
          <Image
            src={developer.picture}
            width={36}
            height={36}
            alt={developer.name}
            className="w-12 h-12 rounded-full"
          />
          <span className="font-medium">{developer.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-5">
          {developer.tasks.length === 0 ? (
            <div className="flex items-center justify-center p-4">
              <p className="text-gray-300">Sem pendências</p>
            </div>
          ) : (
            <>
              {developer.tasks.map((task) => {
                const editMode = isEditing.taskId === task.id;
                const isDeadlinePassed = task.deadline
                  ? getDateObj(task.deadline) < new Date()
                  : false;
                if (task.deadline) console.log(getDateObj(task.deadline));

                return (
                  <li
                    key={task.id}
                    className={`flex items-center justify-between gap-2 md:p-4 border rounded-md dark:bg-secondary ${
                      isDeadlinePassed ? "border-red-200 border" : ""
                    }`}
                  >
                    <div className="flex gap-4 flex-1 items-center">
                      <span
                        className={`inline-block w-2 h-2 ${pickPriorityColor(task.priority)} rounded-full`}
                      ></span>
                      {editMode && updateTask ? (
                        <AppInput
                          bg="bg-background"
                          name="description"
                          value={editForm.description}
                          width="w-[60%]"
                          className="p-3"
                          placeholder={task.description}
                          onChange={(e) => handleChangeEditInputs(e)}
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {task.description}
                        </span>
                      )}
                      {task.customer && !editMode && (
                        <Badge variant="default">{task.customer}</Badge>
                      )}
                      {editMode ? (
                        <AppSelect
                          groupLabel="Prioridade"
                          name="priority"
                          defaultValue={
                            taskPriorityOptions.find(
                              (o) => o.value === editForm.priority,
                            )?.value
                          }
                          className="w-[15%] mt-0"
                          options={taskPriorityOptions}
                          placeholder={task.priority}
                          onChange={(e) => handleChangeEditInputs(e)}
                        />
                      ) : (
                        <Badge
                          variant={pickPriorityVariant(task.priority).type}
                        >
                          {pickPriorityVariant(task.priority).label}
                        </Badge>
                      )}
                      {task.deadline && !editMode && (
                        <div className="px-4 flex gap-3 items-center">
                          <ClockAlert className="w-4 h-4" />
                          {task.deadline}
                        </div>
                      )}
                      {task.deadline && editMode && (
                        <InputPicker
                          change={changeDeadline}
                          value={task.deadline}
                        />
                      )}

                      {/* Something changed at all?  */}
                      {editMode &&
                        updateTask &&
                        (task.priority !== editForm.priority ||
                          task.description !== editForm.description ||
                          task.deadline !== editForm.deadline) && (
                          <Button
                            className="bg-green-300 cursor-pointer hover:bg-green-500"
                            disabled={false}
                            onClick={() => handleUpdateTask(task.id)}
                          >
                            Atualizar Task
                          </Button>
                        )}
                    </div>

                    <div className="flex gap-5">
                      {!editMode && (
                        <AppTooltip content="Resolver Pendência">
                          {solveTask && (
                            <BadgeCheck
                              onClick={() => solveTask(task.id)}
                              className="text-white hover:text-green-600 cursor-pointer"
                            />
                          )}
                        </AppTooltip>
                      )}

                      <AppTooltip content="Editar Pendência">
                        {editMode ? (
                          <AppTooltip content="Cancelar Edição">
                            <X
                              onClick={() =>
                                setIsEditing({ taskId: "", isEditing: false })
                              }
                              className="text-white font-semibold hover:text-gray-700 cursor-pointer"
                            />
                          </AppTooltip>
                        ) : (
                          <div>
                            {updateTask && (
                              <Pencil
                                onClick={() => handleEditAction(task.id, task)}
                                className="text-white font-semibold hover:text-gray-700 cursor-pointer"
                              />
                            )}
                          </div>
                        )}
                      </AppTooltip>
                      {/* <AppTooltip content="Excluir Pendência">
                        <Trash2 className="text-white hover:text-red-300 cursor-pointer" />
                      </AppTooltip> */}
                    </div>
                  </li>
                );
              })}
            </>
          )}
          {addTask && (
            <li className="flex justify-center mt-4">
              <Button
                variant="ghost"
                className="border-gray-600 p-6 border w-full dark:text-gray-300 dark: hover:bg-gray-300 cursor-pointer rounded-md"
                onClick={() => addTask(developer)}
              >
                <PlusIcon className="mr-2" />
                Adicionar nova pendência
              </Button>
            </li>
          )}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};
