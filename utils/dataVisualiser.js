export default async function dataVisualiser(happinessCsv, indicator, location, chartType) {
    let title;
    if (chartType === 'd3-lines') {
        title = `A chart showing change in ${indicator} in ${location}`
    } else if (chartType === 'tables') {
        title = `A table of ${indicator} in ${location}`
    }


    const postResponse = await fetch('https://api.datawrapper.de/v3/charts', {
        method: 'POST',
        headers: {
            'Authorization': process.env.API_KEY,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            'title': title,
            'type': chartType,
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
            'content-type': 'text/csv'
        },

        body: happinessCsv
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
    return chartId;
}