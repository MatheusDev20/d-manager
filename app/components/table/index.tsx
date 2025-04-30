import { Developer } from "@/app/@types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/lib/shadcdn/components/ui/table";
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
          {head.map((item, index) => {
            const style = {
              "Pendências Cadastradas": "text-center",
            };
            return (
              <TableHead
                key={index}
                className={`${style[item as keyof typeof style]} font-medium `}
              >
                {item}
              </TableHead>
            );
          })}
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
            <TableCell className="text-center">
              {developer.tasks.length}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
