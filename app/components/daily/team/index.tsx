"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pickPriorityColor, pickPriorityVariant } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

import { BadgeCheck, Pencil, PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { NewPendecy } from "../../dialogs/new-daily-pendecy";

export type Developer = {
  id: number;
  name: string;
  picture: string;
  status: "ativo" | "inativo";
  pendencies: {
    description: string;
    status: string;
    customer: string;
    priority: string;
  }[];
};

const developers: Developer[] = [
  {
    id: 1,
    name: "Matheus de Paula",
    picture: "/avatars/matheus.jpeg",
    status: "ativo",
    pendencies: [
      {
        description: "Aguardando Validação AI Digital",
        status: "Pending",
        customer: "AI Digital",
        priority: "High",
      },
      {
        description: "Review PR #456",
        status: "In Progress",
        customer: "Internal",
        priority: "Low",
      },
      {
        description: "Update documentation",
        status: "Completed",
        customer: "Documentation Team",
        priority: "Low",
      },
    ],
  },
  {
    id: 2,
    name: "Renata Magno",
    picture: "/avatars/re.jpeg",
    status: "ativo",
    pendencies: [
      {
        description: "Implement feature X",
        status: "Pending",
        customer: "Product Team",
        priority: "Medium",
      },
      {
        description: "Attend team meeting",
        status: "Completed",
        customer: "Internal",
        priority: "High",
      },
    ],
  },
  {
    id: 3,
    name: "Guilherme Andara",
    picture: "/avatars/gui.jpeg",
    status: "ativo",
    pendencies: [
      {
        description: "Refactor module Y",
        status: "In Progress",
        customer: "Development Team",
        priority: "High",
      },
      {
        description: "Write unit tests",
        status: "Pending",
        customer: "QA Team",
        priority: "High",
      },
    ],
  },
  {
    id: 4,
    name: "Eduardo Meira",
    picture: "/avatars/edu.jpeg",
    status: "ativo",
    pendencies: [
      {
        description: "Refactor module Y",
        status: "In Progress",
        customer: "Development Team",
        priority: "High",
      },
      {
        description: "Write unit tests",
        status: "Pending",
        customer: "QA Team",
        priority: "High",
      },
    ],
  },
];
export const Team = () => {
  const [newPendecy, setNewPendecy] = React.useState({
    openModal: false,
    developer: {} as Developer,
  });

  const addNewPendecy = (developer: Developer) => {
    setNewPendecy({ openModal: true, developer });
  };

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
              <ul className="space-y-3">
                {developer.pendencies.map((pendency, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-2 md:p-4 border rounded-md dark:bg-secondary"
                  >
                    <div className="flex gap-4 items-center">
                      <span
                        className={`inline-block w-2 h-2 ${pickPriorityColor(pendency.priority)} rounded-full`}
                      ></span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {pendency.description}
                      </span>
                      <Badge variant="default">{pendency.customer}</Badge>
                      <Badge variant={pickPriorityVariant(pendency.priority)}>
                        {pendency.priority}
                      </Badge>
                    </div>

                    <div className="flex gap-5">
                      <BadgeCheck className="text-white hover:text-green-600 cursor-pointer" />
                      <Pencil className="text-white font-semibold hover:text-gray-700 cursor-pointer" />
                    </div>
                  </li>
                ))}
                <li className="flex justify-center mt-4">
                  <Button
                    variant="ghost"
                    className="border-gray-600 p-6 border w-full dark:text-gray-300 dark: hover:bg-gray-300 cursor-pointer rounded-md"
                    onClick={() => addNewPendecy(developer)}
                  >
                    <PlusIcon className="mr-2" />
                    Adicionar nova pendência
                  </Button>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
