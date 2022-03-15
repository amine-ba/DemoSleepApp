import React from "react";
import { FormControl, WarningOutlineIcon } from "native-base";

import { TextContent } from "@consts";
import SelectInpu from "./SelectInput";

export const DropDownSelect = ({
  items,
  value,
  onValueChange,
  title,
  validate,
  placeholder,
}: DropDownSelectProps) => {
  const errorMessage = validate?.(value);

  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormControl.Label mb="3">{title}</FormControl.Label>

      <SelectInpu
        items={items}
        onValueChange={onValueChange}
        value={value}
        placeholder={placeholder}
      />

      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorMessage || TextContent.default.error}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export interface DropDownSelectProps {
  items: SelectItem[];
  value: string;
  onValueChange: (value: string) => void;
  title?: string;
  placeholder?: string;
  validate?: (value: string) => string | null;
}

export default DropDownSelect;
