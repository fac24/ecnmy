import SelectForm from "../components/SelectForm";
import { selectAllByServerSideParam } from "../database/model";

// Turns the rows got from the db into options for the react-select component
import selectOptions from "../utils/selectOptions";

export async function getServerSideProps() {
  // Get locations and topics
  const locations = await selectAllByServerSideParam("locations");
  const topics = await selectAllByServerSideParam("topics");

  // Turn these locations and topics into options for react-select
  const locationOptions = selectOptions(locations);
  const topicOptions = [
    { value: "All", label: "All" },
    ...selectOptions(topics),
  ];
  return { props: { topicOptions, locationOptions } };
}

export default function Home({ topicOptions, locationOptions }) {
  return (
    <main>
      <h1 className="text-7xl text-center font-bold text-ecnmy-charcoal mt-6 mb-4">
        ECNMY DATA DASHBOARD
      </h1>
      <SelectForm
        topicOptions={topicOptions}
        locationOptions={locationOptions}
      />
    </main>
  );
}
