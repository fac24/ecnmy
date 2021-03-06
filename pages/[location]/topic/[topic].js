import {
  selectAllByServerSideParam,
  selectDataByTopicName,
  selectDistinctTopicsWithData,
} from "../../../database/model";
import Card from "../../../components/Card";
import cardDataArranger from "../../../utils/cardDataArranger";
import selectOptions from "../../../utils/selectOptions";
import SelectForm from "../../../components/SelectForm";
import LocalStoryCard from "../../../components/LocalStoryCard";

export async function getServerSideProps({ params }) {
  //params.location gives the location part of URL
  //params.topic gives the topic part of the URL
  // 1. Query database for datasets with respective topics params.topic

  const location = params.location;
  const datasets =
    params.topic === "All"
      ? await selectAllByServerSideParam("datasets")
      : await selectDataByTopicName(params.topic);

  // Map the datasets given back to something that we can form into cards
  const locationDatasets = cardDataArranger(datasets, location);
  // locationDatasets includes
  // locationData: this will be the value for that location and indicator
  // ukData: this will be the uks value
  // londonData: this will be londons value
  // ranking: this will be it's ranking of the most recent year compared to other london boroughs
  // change: this will be the percentage change based on the relevant borough last year
  // indicator: the name of the dataset indicator
  // Get locations and topics
  const locations = await selectAllByServerSideParam("locations");
  const topics = await selectDistinctTopicsWithData();

  // Turn these locations and topics into options for react-select
  const locationOptions = selectOptions(locations);
  const topicOptions = [
    { value: "All", label: "All" },
    ...selectOptions(topics),
  ];
  return {
    props: {
      locationDatasets,
      location,
      locationOptions,
      topicOptions,
      topic: params.topic,
    },
  };
}

export default function Cards({
  locationDatasets,
  location,
  locationOptions,
  topicOptions,
  topic,
}) {
  const cards = locationDatasets.map((dataset, index) => {
    return <Card dataset={dataset} key={index} location={location} />;
  });
  return (
    <div className="">
      <SelectForm
        topicOptions={topicOptions}
        locationOptions={locationOptions}
        defaultValue={{ location, topic }}
        invisible={true}
      />
      <div className="flex justify-evenly gap-3 flex-wrap  p-4 pb-6">
        {cards}
        <LocalStoryCard />
      </div>
    </div>
  );
}
