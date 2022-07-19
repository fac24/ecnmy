import { selectDataByTopicName } from "../../database/model";

const sortByYearReturningOneYear = (arr, slice) => {
  return arr
    .sort((a, b) => {
      return (
        parseInt(b.Time.substring(0, 4)) - parseInt(a.Time.substring(0, 4))
      );
    })
    .slice(slice[0], slice[1]);
};

const getDataByGeography = (arr, Geography) => {
  return arr[arr.findIndex((item) => item.Geography === Geography)];
};

const findChange = (current, previous, Geography) => {
  const currentValue = getDataByGeography(current, Geography).Value;
  const previousValue = getDataByGeography(previous, Geography).Value;
  return ((currentValue - previousValue) / previousValue) * 100;
};

export async function getServerSideProps({ params }) {
  //params.location gives the location part of URL
  //params.topic gives the topic part of the URL
  if (params.location !== "favicon.ico") {
    // 1. Query database for datasets with respective topics params.topic
    const location = params.location;

    const datasets = await selectDataByTopicName(params.topic);
    const locationDatasets = datasets.map((dataset) => {
      const dataArray = dataset.data.data;

      const allCurrentYearData = sortByYearReturningOneYear(dataArray, [0, 35]);
      const lastYearsData = sortByYearReturningOneYear(dataArray, [35, 70]);
      const boroughCurrentYearData = allCurrentYearData
        .filter((data) => {
          return data.Geography === "United Kingdom" ||
            data.Geography === "London"
            ? false
            : true;
        })
        .sort((a, b) => b.Value - a.Value);

      const locationData = getDataByGeography(allCurrentYearData, location);
      const ukData = getDataByGeography(
        allCurrentYearData,
        "United Kingdom"
      ).Value;
      const londonData = getDataByGeography(allCurrentYearData, "London").Value;
      const ranking =
        boroughCurrentYearData.findIndex(
          (item) => item.Geography === location
        ) + 1; // +1 as 0 indexed
      const change = findChange(allCurrentYearData, lastYearsData, location);

      return {
        cardData: { locationData, ukData, londonData, ranking, change },
        indicator: dataset.indicator,
      };
    });
    // CardData includes
    // locationData: this will be the value for that location and indicator
    // ukData: this will be the uks value
    // londonData: this will be londons value
    // ranking: this will be it's ranking of the most recent year compared to other london boroughs
    // change: this will be the percentage change based on the relevant borough last year
    // 2. With datasets, do some working out for the location, and extra bits like ranking etc.
    console.log(locationDatasets);
    return {
      props: {
        locationDatasets,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default function Cards({ locationDatasets }) {
  const cards = locationDatasets.map((dataset, index) => {
    const cardData = dataset.cardData;
    return (
      <div key={index} className="border-2">
        <h2 className="capitalize">{dataset.indicator}</h2>
        <h3>{dataset.cardData.locationData.Value}</h3>
        <ul>
          <li>This ranks {cardData.ranking}/33 of the London Boroughs</li>
          <li>The London value is {cardData.londonData}</li>
          <li>The Uk value is {cardData.ukData}</li>
          {cardData.change > 0 ? (
            <li>This has increased by {cardData.change.toFixed(2)}</li>
          ) : (
            <li>This has decreased by {-cardData.change.toFixed(2)}</li>
          )}
        </ul>
      </div>
    );
  });
  return (
    <>
      <h1>Card Page</h1>
      {cards}
    </>
  );
}
