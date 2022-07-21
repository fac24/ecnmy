import Select from "react-select";

export default function SelectForm({
  locationOptions,
  topicOptions,
  defaultValue,
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
    <form action="/api/location-topic-form" method="POST">
      <label htmlFor="select-location">Select Location</label>
      <Select
        id="select-location"
        name="location"
        options={locationOptions}
        defaultValue={defaultLocation}
      />
      <label htmlFor="select-topic">Select Topic</label>
      <Select
        id="select-topic"
        name="topic"
        options={topicOptions}
        defaultValue={defaultTopic}
      />
      <button type="submit">GO!</button>
    </form>
  );
}
