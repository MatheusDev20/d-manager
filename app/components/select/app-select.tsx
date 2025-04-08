import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  options: { value: string; label: string }[];
  groupLabel: string;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
};

export function AppSelect(props: Props) {
  const { options, groupLabel, defaultValue, disabled, placeholder } = props;
  const [selectedValue, setSelectedValue] = React.useState<string>(
    defaultValue || "",
  );

  return (
    <Select
      value={selectedValue}
      onValueChange={(value) => setSelectedValue(value)}
    >
      <SelectTrigger disabled={disabled} className="w-full mt-3">
        <SelectValue placeholder={placeholder ?? "Placeholder"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{groupLabel}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
