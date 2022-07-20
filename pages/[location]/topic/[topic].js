import {
  selectAllByServerSideParam,
  selectDataByTopicName,
} from "../../../database/model";
import Card from "../../../components/Card";
import cardDataArranger from "../../../utils/cardDataArranger";

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
  return {
    props: {
      locationDatasets,
      location,
    },
  };
}

export default function Cards({ locationDatasets, location }) {
  const cards = locationDatasets.map((dataset, index) => {
    return <Card dataset={dataset} key={index} location={location} />;
  });
  return (
    <>
      <h1>Card Page</h1>
      {/*Present dropdown menus appropriate to those (i.e. first shows borough; second topic)*/}
      {cards}
    </>
  );
}
