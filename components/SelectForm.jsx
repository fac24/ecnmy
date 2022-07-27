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

  return (
    <form
      action="/api/location-topic-form"
      method="POST"
      className="grid place-items-center gap-3 p-10"
    >
      <div className="flex justify-around w-full max-w-xl m-auto flex-wrap">
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
      </div>

      <button
        className=" text-lg px-4 py-2 bg-ecnmy-mint rounded-xl hover:font-bold"
        type="submit"
      >
        GO
      </button>
    </form>
  );
}
