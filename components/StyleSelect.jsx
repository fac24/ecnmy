import Select from "react-select";

export default function StyleSelect({ options, defaultValue, id, invisible }) {
  return (
    <fieldset className="min-w-[250px]">
      <label
        htmlFor={`select-${id}`}
        className={`capitalize ${invisible ? "invisible" : null}`}
      >
        Select {id}
      </label>
      <Select
        id={`select-${id}`}
        name={id}
        options={options}
        defaultValue={defaultValue}
      />
    </fieldset>
  );
}
