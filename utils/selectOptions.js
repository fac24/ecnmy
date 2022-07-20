export default function selectOptions(rows) {
  return rows.map((item) => {
    return {
      value: item.name,
      label: item.name,
    };
  });
}
