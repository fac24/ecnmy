import StyleSelect from "./StyleSelect";

export default function SelectForm({
  locationOptions,
  topicOptions,
  defaultValue,
  invisible,
}) {
  const defaultLocation = defaultValue
    ? {
        label: defaultValue?.location,
        value: defaultValue?.location,
      }
    : null;
  const defaultTopic = defaultValue
    ? {
        label: defaultValue?.topic,
        value: defaultValue?.topic,
      }
    : null;
  console.log(defaultLocation);
  return (
    <form
      action="/api/location-topic-form"
      method="POST"
      className="flex justify-evenly"
    >
      <StyleSelect
        options={locationOptions}
        id="location"
        defaultValue={defaultLocation}
        invisible={invisible}
      />
      <StyleSelect
        options={topicOptions}
        id="topic"
        defaultValue={defaultTopic}
        invisible={invisible}
      />
      <button type="submit">GO!</button>
    </form>
  );
}
