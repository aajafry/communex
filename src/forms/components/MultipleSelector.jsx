import Select from "react-select";

export const MultipleSelector = ({ name, options, onChange, value }) => {
  if (!options) return;

  const allOptions = [{ value: "all", label: "Select All" }, ...options];

  const formattedValue = value.includes("all")
    ? allOptions
    : options.filter((option) => value.includes(option.value));

  const isAllSelected = formattedValue.length === options.length;

  const handleChange = (selectedOptions) => {
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
