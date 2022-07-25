import { selectDatasetByIndicator } from "../../../database/model";
import cardDataArranger from "../../../utils/cardDataArranger";
import dataVisualiser from "../../../utils/dataVisualiser";

export async function getServerSideProps({ params }) {
    if (params.location !== "favicon.ico") {
        const indicator = params.indicator;
        const location = params.location;

        const dataset = await selectDatasetByIndicator(indicator);

        const apiURL = dataset?.metadata?.api || null;

        const metadata =
            apiURL !== null
                ? await fetch(apiURL).then((resolve) => resolve.json())
                : dataset?.metadata || null;
        const boroughData = dataset.data.data.filter(
            (object) => object.Geography === location
        );
        const [locationDataset] = cardDataArranger([dataset], location);
        const happinessData = await selectDatasetByIndicator(indicator);
        let indicatorCsv = `Year,${indicator}\n`
        let boroughDataSortedByYear = boroughData.sort((a, b) => {
            return (
                parseInt(a.Time.substring(0, 4)) - parseInt(b.Time.substring(0, 4))
            );
        })
        let yearNumber = boroughDataSortedByYear.length;

        boroughDataSortedByYear
            .map(datum => {
                indicatorCsv += `${datum['Time']},${datum['Value']}\n`
            })
        //Geography,Values
        //

        const lineChartId = await dataVisualiser(indicatorCsv, indicator, location, 'd3-lines');
        const tableId = await dataVisualiser(indicatorCsv, indicator, location, 'tables');
        const test = await dataVisualiser(indicatorCsv, indicator, location, 'd3-maps-choropleth');
        console.log("test");
        console.log(test);
        return {
            props: { location, boroughData, metadata, locationDataset, lineChartId, tableId, yearNumber, test },
        };
    } else {
        return {
            props: {}
        }
    }
}


export default function Indicator({
    indicator,
    location,
    boroughData,
    metadata,
    locationDataset,
    lineChartId,
    tableId,
    yearNumber,
    test
}) {
    return (
        <main>
            <h1 className="blue capitalize">{locationDataset.indicator} in {location}</h1>
            <h2>
                Name of study: {metadata.title}
            </h2>
            <h3>Last updated: {metadata.release_date.substring(0, 4)}</h3>
            <p>Description: {metadata.description}</p>
            {/* <div className="w-full h-[400px]">
                <iframe aria-label={`A chart showing the change in ${indicator} in ${location}`} id="datawrapper-chart-0jKkG" src={`https://datawrapper.dwcdn.net/${lineChartId}/1/`} className="w-full min-w-full h-full" scrolling="no" frameBorder="0">
                </iframe>
            </div>
            <div className={`w-1/2 h-[1600px] m-auto`}>
                <iframe aria-label={`A table for ${indicator} in ${location}`} id="datawrapper-chart-0jKkG" src={`https://datawrapper.dwcdn.net/${tableId}/1/`} className="w-full min-w-full h-full" scrolling="no" frameBorder="0">
                </iframe>
            </div> */}
            <div className={`w-1/2 h-[1600px] m-auto`}>
                <iframe id="datawrapper-chart-0jKkG" src={`https://datawrapper.dwcdn.net/${test}/1/`} className="w-full min-w-full h-full" scrolling="no" frameBorder="0">
                </iframe>
            </div>
        </main>
    );
}
