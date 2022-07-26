import useDatawrapper from "../../../components/hooks/useDatawrapper";
import { selectDatasetByIndicator } from "../../../database/model";
import cardDataArranger from "../../../utils/cardDataArranger";
import Loading from "../../../components/Loading";

export async function getServerSideProps({ params }) {
  if (params.location !== "favicon.ico") {
    const indicator = params.indicator;
    const location = params.location;

    const dataset = await selectDatasetByIndicator(indicator);

    const metadata = dataset?.metadata || null;
    const boroughData = dataset.data.data.filter(
      (object) => object.Geography === location
    );
    const [locationDataset] = cardDataArranger([dataset], location);

    let chartCsv = `Year,${indicator}\n`;
    let tableCsv = `Year,${indicator}\n`;

    let boroughDataSortedByYearChart = boroughData.sort((a, b) => {
      return (
        parseInt(a.Time.substring(0, 4)) - parseInt(b.Time.substring(0, 4))
      );
    });
    let boroughDataSortedByYearTable = boroughData.sort((a, b) => {
      return (
        parseInt(b.Time.substring(0, 4)) - parseInt(a.Time.substring(0, 4))
      );
    });

    boroughDataSortedByYearChart.map((datum) => {
      chartCsv += `${datum["Time"].substring(0, 4)},${datum["Value"]}\n`;
    });
    boroughDataSortedByYearTable.map((datum) => {
      tableCsv += `${datum["Time"]},${datum["Value"]}\n`;
    });
    console.log(chartCsv);
    return {
      props: {
        location,
        boroughData,
        metadata,
        locationDataset,
        chartCsv,
        tableCsv,
        indicator,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default function Indicator({
  indicator,
  location,
  metadata,
  locationDataset,
  chartCsv,
  tableCsv,
}) {
  const [lineChartId, lineChartLoading] = useDatawrapper(
    chartCsv,
    indicator,
    location,
    "d3-lines"
  );
  const [tableId, tableLoading] = useDatawrapper(
    tableCsv,
    indicator,
    location,
    "tables"
  );

  return (
    <main>
      <h1 className="blue capitalize">
        {locationDataset.indicator} in {location}
      </h1>
      <h2>Name of study: {metadata.title}</h2>
      <h3>Last updated: {metadata.release_date.substring(0, 4)}</h3>
      <p>Description: {metadata.description}</p>
      <div className="w-full h-[400px]">
        {lineChartLoading === true ? (
          <Loading />
        ) : (
          <iframe
            aria-label={`A chart showing the change in ${indicator} in ${location}`}
            id="datawrapper-chart-0jKkG"
            src={`https://datawrapper.dwcdn.net/${lineChartId}/1/`}
            className="w-full min-w-full h-full"
            scrolling="no"
            frameBorder="0"
          ></iframe>
        )}
      </div>
      <div className={`w-1/2 h-[1600px] m-auto`}>
        {tableLoading === true ? (
          <Loading />
        ) : (
          <iframe
            aria-label={`A table for ${indicator} in ${location}`}
            id="datawrapper-chart-0jKkG"
            src={`https://datawrapper.dwcdn.net/${tableId}/1/`}
            className="w-full min-w-full h-full"
            scrolling="no"
            frameBorder="0"
          ></iframe>
        )}
      </div>
    </main>
  );
}
