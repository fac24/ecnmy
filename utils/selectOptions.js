export default function selectOptions(rows, key = "name") {
  return rows.map((item) => {
    return {
      value: item[key],
      label: item[key],
    };
  });
}
