import Select from "react-select";
import { selectAllByServerSideParam } from "../database/model";

// Turns the rows got from the db into options for the react-select component
const selectOptions = (rows) => {
  return rows.map((item) => {
    return {
      value: item.name,
      label: item.name,
    };
  });
};

export async function getServerSideProps() {
  // Get locations and topics
  const locations = await selectAllByServerSideParam("locations");
  const topics = await selectAllByServerSideParam("topics");

  // Turn these locations and topics into options for react-select
  const locationOptions = selectOptions(locations);
  const topicOptions = selectOptions(topics);
  return { props: { topicOptions, locationOptions } };
}

export default function Home({ topicOptions, locationOptions }) {
  return (
    <main>
      <h1 className="blue">ECNMY DASHBOARD</h1>
      <form action="/api/location-topic-form" method="POST">
        <label htmlFor="select-location">Select Location</label>
        <Select
          id="select-location"
          name="location"
          options={locationOptions}
        />
        <label htmlFor="select-topic">Select Topic</label>
        <Select id="select-topic" name="topic" options={topicOptions} />
        <button type="submit">GO!</button>
      </form>
    </main>
  );
}
