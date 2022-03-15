import React from "react";
import { CheckIcon, Select } from "native-base";

import theme from "@shared/theme";

export const SelectInpu = ({
  items,
  value,
  onValueChange,
  placeholder,
}: DropDownSelectProps) => {
  return (
    <Select
      selectedValue={value}
      minWidth="200"
      accessibilityLabel={placeholder}
      placeholder={placeholder}
      _selectedItem={{
        bg: theme.colors.primary.teal600,
        endIcon: <CheckIcon size="5" />,
      }}
      mt={1}
      onValueChange={onValueChange}
    >
      {items.map(({ label, value }) => (
        <Select.Item key={label} label={label} value={value} />
      ))}
    </Select>
  );
};

export interface DropDownSelectProps {
  items: SelectItem[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export default SelectInpu;
