import happiness from "../../../datasets/happiness.json";

export async function getServerSideProps(params) {
    const indicator = params.indicator;
    const location = params.location;
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
    const publishResponse = await fetch(`https://api.datawrapper.de/charts/${chartId}/publish`, {
        method: 'POST',
        headers: {
            'Authorization': process.env.API_KEY,
        }
    });

    return {
        props: {}
    }
}



export default function Indicator() {

    return (
        <main>
            <h1 className="blue">Indicator Page</h1>
        </main>
    );
}