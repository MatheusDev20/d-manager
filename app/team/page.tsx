import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";

type Developer = {
  id: number;
  name: string;
  picture: string;
  pendencies: string[];
};

const developers: Developer[] = [
  {
    id: 1,
    name: "Matheus de Paula",
    picture: "/avatars/matheus.jpeg",
    pendencies: ["Fix bug #123", "Review PR #456", "Update documentation"],
  },
  {
    id: 2,
    name: "Renata Magno",
    picture: "/avatars/re.jpeg",
    pendencies: ["Implement feature X", "Attend team meeting"],
  },
  {
    id: 3,
    name: "Guilherme Andara",
    picture: "/avatars/gui.jpeg",
    pendencies: ["Refactor module Y", "Write unit tests"],
  },
  {
    id: 4,
    name: "Eduardo Meira",
    picture: "/avatars/edu.jpeg",
    pendencies: ["Refactor module Y", "Write unit tests"],
  },
];

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Desenvolvedores</h1>
      <Accordion type="single" collapsible>
        {developers.map((developer) => (
          <AccordionItem key={developer.id} value={`developer-${developer.id}`}>
            <AccordionTrigger className="flex border p-3 gap-4 mb-7 cursor-pointer hover:bg-gray-950 rounded-md">
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
              <ul className="list-disc pl-6">
                {developer.pendencies.map((pendency, index) => (
                  <li key={index}>{pendency}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
