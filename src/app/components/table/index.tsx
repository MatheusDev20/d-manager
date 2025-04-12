import { Developer } from "@/src/app/@types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { CircleMinus } from "lucide-react";
import Image from "next/image";

type Props = {
  caption: string;
  head: string[];
  values: Developer[];
};
export const AppTable = ({ caption, head, values }: Props) => {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {head.map((item, index) => (
            <TableHead
              key={index}
              className={`${item === "Nome" ? "text-left ml-4 w-[40px]" : ""} font-medium w-[40px]`}
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {values.map((developer) => (
          <TableRow key={developer.id} className="cursor-pointer">
            <TableCell className="font-medium p-6 flex gap-4 items-center">
              <Image
                width={24}
                height={24}
                src={developer.picture}
                alt={developer.name}
                className="w-8 h-8 rounded-full"
              />
              {developer.name}
            </TableCell>
            <TableCell>{developer.status.toLocaleUpperCase()}</TableCell>
            <TableCell>
              {developer.status === "ativo" ? (
                <CircleMinus className="w-6 h-5 cursor-pointer hover:text-green-400" />
              ) : (
                <p>Ativar</p>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
