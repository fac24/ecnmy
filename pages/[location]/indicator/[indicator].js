import useDatawrapper from "../../../components/hooks/useDatawrapper";
import { selectDatasetByIndicator } from "../../../database/model";
import cardDataArranger from "../../../utils/cardDataArranger";
import Loading from "../../../components/Loading";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  // Get the parameters of the url
  const indicator = params.indicator;
  const location = params.location;

  // Select the single dataset needed for the specific indicator
  const dataset = await selectDatasetByIndicator(indicator);

  const metadata = dataset?.metadata || null;
  //Data for the specific location clicked on for more info
  const boroughData = dataset.data.data.filter(
    (object) => object.Geography === location
  );
  const [locationDataset] = cardDataArranger([dataset], location);

  // Starting the csvs to send to datawrapper-proxy
  let chartCsv = `Year,${indicator}\n`;
  let tableCsv = `Year,${indicator}\n`;

  let boroughDataSortedByYearChart = boroughData.sort((a, b) => {
    return parseInt(a.Time.substring(0, 4)) - parseInt(b.Time.substring(0, 4));
  });
  let boroughDataSortedByYearTable = boroughData.sort((a, b) => {
    return parseInt(b.Time.substring(0, 4)) - parseInt(a.Time.substring(0, 4));
  });

  boroughDataSortedByYearChart.map((datum) => {
    chartCsv += `${datum["Time"].substring(0, 4)},${datum["Value"]}\n`;
  });
  boroughDataSortedByYearTable.map((datum) => {
    tableCsv += `${datum["Time"]},${datum["Value"]}\n`;
  });

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

  let x = tableCsv.length * 3.9;
  let tableHeight = x.toString() + "px";

  return (
    <main>
      <h1 className="blue capitalize font-bold text-center text-3xl p-5">
        {locationDataset.indicator} in {location}
      </h1>
      <div className="flex items-center flex-wrap justify-around">
        <div className="p-5 rounded-xl  max-w-[400px]">
          <h2>
            <span className="font-semibold">Name of study:</span>{" "}
            <Link href={metadata.datasetLink}>
              <a className="underline text-blue-600 hover:text-ecnmy-navy visited:text-ecnmy-grape">
                {metadata.title}
              </a>
            </Link>
          </h2>
          <h3>
            <span className="font-semibold">Last updated:</span>{" "}
            {metadata.release_date.substring(0, 4)}
          </h3>
          {metadata.sampleSize ? (
            <h3>
              <span className="font-semibold">Sample size:</span>{" "}
              {metadata.sampleSize}
            </h3>
          ) : null}
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {metadata.description}
          </p>
        </div>
        <div className="w-full h-[400px] w-full min-w-[310px] max-w-[610px] p-5">
          {lineChartLoading === true ? (
            <Loading />
          ) : (
            <iframe
              title={`A chart showing the change in ${indicator} in ${location}`}
              id="datawrapper-chart-0jKkG"
              src={`https://datawrapper.dwcdn.net/${lineChartId}/1/`}
              className="w-full min-w-full h-full"
              scrolling="no"
              frameBorder="0"
            ></iframe>
          )}
        </div>
      </div>

      <div className="max-w-xl h-full m-auto border p-6">
        {tableLoading === true ? (
          <Loading />
        ) : (
          <iframe
            style={{ height: tableHeight }}
            title={`A table for ${indicator} in ${location}`}
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
