import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

type Props = {
  options: { value: string; label: string }[];
  groupLabel: string;
  defaultValue?: string;
  disabled?: boolean;
  name: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export function AppSelect(props: Props) {
  const { options, groupLabel, defaultValue, disabled, placeholder } = props;
  const [selectedValue, setSelectedValue] = React.useState<string>(
    defaultValue || "",
  );

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    if (props.onChange) props.onChange(value);
  };

  return (
    <Select
      name={props.name}
      value={selectedValue}
      onValueChange={handleValueChange}
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
