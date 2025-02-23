import { FC } from "react";
import Select, { MultiValue } from "react-select";

type OptionType = {
  value: string;
  label: string;
};

type PropsType = {
  name: string;
  options: OptionType[];
  onChange: (name: string, value: string[]) => void;
  value: string[];
};

export const MultipleSelector: FC<PropsType> = ({
  name,
  options,
  onChange,
  value,
}: PropsType) => {
  if (!options) return;

  const allOptions = [{ value: "all", label: "Select All" }, ...options];

  const formattedValue = value.includes("all")
    ? allOptions
    : options.filter((option) => value.includes(option.value));

  const isAllSelected = formattedValue.length === options.length;

  const handleChange = (selectedOptions: MultiValue<OptionType>) => {
    const selectedValues = selectedOptions.map((option) => option.value);

    if (selectedValues.includes("all")) {
      onChange(
        name,
        isAllSelected ? [] : options.map((option) => option.value)
      );
    } else {
      onChange(name, selectedValues);
    }
  };

  return (
    <Select
      isMulti
      name={name}
      options={allOptions}
      onChange={handleChange}
      value={formattedValue}
      placeholder="Search Members..."
      className="member-multi-select"
      classNamePrefix="select"
    />
  );
};
