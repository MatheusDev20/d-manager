import React from "react";
import { AppTable } from "../components/table";
import { Developer } from "../@types";

export const developers: Developer[] = [
  {
    id: 1,
    name: "Matheus de Paula",
    picture: "/avatars/matheus.jpeg",
    status: "ativo",
    pendencies: [
      {
        id: "1",
        description: "Aguardando Validação AI Digital",
        status: "Pending",
        customer: "AI Digital",
        priority: "High",
      },
      {
        id: "1",
        description: "Review PR #456",
        status: "In Progress",
        customer: "Internal",
        priority: "Low",
      },

      {
        id: "1",
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
        id: "1",
        description: "Implement feature X",
        status: "Pending",
        customer: "Product Team",
        priority: "Medium",
      },
      {
        id: "1",
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
        id: "1",
        description: "Refactor module Y",
        status: "In Progress",
        customer: "Development Team",
        priority: "High",
      },
      {
        id: "1",
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
        id: "1",
        description: "Refactor module Y",
        status: "In Progress",
        customer: "Development Team",
        priority: "High",
      },
      {
        id: "1",
        description: "Write unit tests",
        status: "Pending",
        customer: "QA Team",
        priority: "High",
      },
    ],
  },
];

export default function Page() {
  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-4">Desenvolvedores</h1> */}
      <AppTable
        caption="Desenvolvedores cadastrados"
        head={["Nome", "Status", "Ações"]}
        values={developers}
      />
    </div>
  );
}
