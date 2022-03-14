import React from "react";
import {
  CheckIcon,
  FormControl,
  Select,
  WarningOutlineIcon,
} from "native-base";

import { locals } from "@consts";


export const DropDownSelect = ({
  items,
  value,
  onValueChange,
  title,
  placeholder,
  validate,
}: DropDownSelectProps) => {
  const errorMessage = validate?.(value);

  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormControl.Label mb="3">{title}</FormControl.Label>

      <Select
        selectedValue={value}
        minWidth="200"
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={onValueChange}
      >
        {items.map(({ label, value }) => (
          <Select.Item key={label} label={label} value={value} />
        ))}
      </Select>

      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorMessage || locals.default.error}
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
