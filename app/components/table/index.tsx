import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Developer } from "../daily/team";
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
            <TableCell>Ações</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
