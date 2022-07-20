import { selectDatasetByIndicator } from "../../../database/model";
import cardDataArranger from "../../../utils/cardDataArranger";
import happiness from "../../../datasets/happiness.json";

export async function getServerSideProps({ params }) {
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

    return {
        props: { location, boroughData, metadata, locationDataset },
    };
}
async function dataWrapper() {
    const postResponse = await fetch('https://api.datawrapper.de/v3/charts', {
        method: 'POST',
        headers: {
            'Authorization': process.env.API_KEY,
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
            'Authorization': process.env.API_KEY,
            'content-type': 'json'
        },
        body: happiness
    })
    const getResponse = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}/data`, {
        method: 'GET',
        headers: {
            'Authorization': process.env.API_KEY,
        }
    })
    const getResponseJson = await getResponse.json();
    console.log(getResponseJson);
    const publishResponse = await fetch(`https://api.datawrapper.de/charts/${chartId}/publish`, {
        method: 'POST',
        headers: {
            'Authorization': process.env.API_KEY,
        }
    });
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
            <h2 onClick={dataWrapper}>
                {metadata.title}: {locationDataset.indicator}
            </h2>
            <p>{metadata.description}</p>
        </main>
    );
}
