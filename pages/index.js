import Select from "react-select";
import { selectAllByServerSideParam } from "../database/model";

const selectOptions = (rows) => {
  return rows.map((item) => {
    return {
      value: item.name,
      label: item.name,
    };
  });
};

export async function getServerSideProps() {
  const locations = await selectAllByServerSideParam("locations");
  const topics = await selectAllByServerSideParam("topics");
  const locationOptions = selectOptions(locations);
  const topicOptions = selectOptions(topics);
  return { props: { topicOptions, locationOptions } };
}

export default function Home({ topicOptions, locationOptions }) {
  return (
    <main>
      <h1 className="blue">ECNMY DASHBOARD</h1>
      <form action="/cards">
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
