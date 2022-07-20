import { selectDatasetByIndicator } from "../../../database/model";
import cardDataArranger from "../../../utils/cardDataArranger";

export async function getServerSideProps({ params }) {
    console.log(params);
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
        console.log(boroughData);
        const [locationDataset] = cardDataArranger([dataset], location);
        const happinessData = await selectDatasetByIndicator(indicator);
        let happinessCsv = `Year,Value\n`
        let boroughDataSortedByYear = boroughData.sort((a, b) => {
            return (
                parseInt(a.Time.substring(0, 4)) - parseInt(b.Time.substring(0, 4))
            );
        })
        boroughDataSortedByYear
            .map(datum => {
                happinessCsv += `${datum['Time']},${datum['Value']}\n`
            })
        console.log(happinessCsv)
        //Geography,Values
        //

        const postResponse = await fetch('https://api.datawrapper.de/v3/charts', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer slNaD4OuOSP9GyCSKCLi6rECSkMGqWySPDmPzXFBXaTKU1IwMl41Jx6BnG1p6CCT',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                'title': 'Where do people live?',
                'type': 'd3-lines',
                'lastEditStep': 3
            })
        })
        const postJson = await postResponse.json();
        const chartId = postJson.id;
        console.log(chartId);
        const putResponse = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}/data`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer slNaD4OuOSP9GyCSKCLi6rECSkMGqWySPDmPzXFBXaTKU1IwMl41Jx6BnG1p6CCT',
                'content-type': 'text/csv'
            },

            body: happinessCsv
        })
        const getResponse = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}/data`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer slNaD4OuOSP9GyCSKCLi6rECSkMGqWySPDmPzXFBXaTKU1IwMl41Jx6BnG1p6CCT',
            }
        })
        const publishResponse = await fetch(`https://api.datawrapper.de/charts/${chartId}/publish`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer slNaD4OuOSP9GyCSKCLi6rECSkMGqWySPDmPzXFBXaTKU1IwMl41Jx6BnG1p6CCT',
            }
        });

        return {
            props: { location, boroughData, metadata, locationDataset },
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
}) {
    return (
        <main>
            <h1 className="blue">Indicator Page</h1>
            {/* <h2>
                {metadata.title}: {locationDataset.indicator}
            </h2>
            <p>{metadata.description}</p> */}
        </main>
    );
}
