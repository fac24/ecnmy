export default async function dataVisualiser(indicatorCsv, indicator, location, chartType) {
    let title;
    if (chartType === 'd3-lines') {
        title = `A chart showing change in ${indicator} in ${location}`
    } else if (chartType === 'tables') {
        title = `A table of ${indicator} in ${location}`
    } else if (chartType === 'd3-maps-choropleth') {
        title = `Choropleth`
    }

    //initialises empty chart
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

    if (chartType === 'd3-maps-choropleth') {
        // const list = await fetch('https://api.datawrapper.de/plugin/basemaps')
        // console.log(list);
        console.log(chartId);
    }

    //     curl --request PUT \
    //     --url https://api.datawrapper.de/v3/charts/<ID>/data \
    //     --header 'Authorization: Bearer <YOUR_TOKEN_HERE>' \
    //     --header 'content-type: text/csv' \
    //     --data "country,code,literacy-rate
    //   Angola,AGO,71.2
    //   Burundi,BDI,85.5
    //   Benin,BEN,38.4
    //   Burkina Faso,BFA,37.7
    //   ...
    //   Tanzania,TZA,80.4
    //   Uganda,UGA,73.8
    //   South Africa,ZAF,94.6
    //   Zambia,ZMB,85.1
    //   Zimbabwe,ZWE,86.9"


    //populates chart with data
    if (chartType !== 'd3-maps-choropleth') {
        const putResponse = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}/data`, {
            method: 'PUT',
            headers: {
                'Authorization': process.env.API_KEY,
                'content-type': 'text/csv'
            },

            body: indicatorCsv
        })
    } else {
        const putResponse = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}/data`, {
            method: 'PUT',
            headers: {
                'Authorization': process.env.API_KEY,
                'content-type': 'text/csv'
            },

            body: `country,code,literacy-rate
            Angola,AGO,71.2
            Burundi,BDI,85.5
            Benin,BEN,38.4
            Botswana,BWA,88.2
            Cameroon,CMR,75
            Congo,COG,79.3
            Comoros,COM,78.1
            Algeria,DZA,79.6
            Egypt,EGY,75.8
            Eritrea,ERI,73.8
            Ethiopia,ETH,49
            Gabon,GAB,83.2
            Ghana,GHA,76.6
            Guinea,GIN,30.5
            Gambia,GMB,55.6
            Kenya,KEN,78
            Liberia,LBR,47.6
            Libya,LBY,91.4
            Lesotho,LSO,79.4
            Morocco,MAR,71.7
            Madagascar,MDG,64.7
            Mali,MLI,33.1
            Mozambique,MOZ,58.8
            Mauritania,MRT,52.1
            Malawi,MWI,66
            Namibia,NAM,90.8
            Niger,NER,19.1
            Nigeria,NGA,59.6
            Rwanda,RWA,71.2
            Sudan,SDN,58.6
            Senegal,SEN,55.6
            Swaziland,SWZ,87.5
            Chad,TCD,40
            Togo,TGO,66.5
            Tunisia,TUN,81.1
            Tanzania,TZA,80.4
            Uganda,UGA,73.8
            Zambia,ZMB,85.1
            Zimbabwe,ZWE,86.9`
        })

        const patchResponse = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': process.env.API_KEY,
                'content-type': 'applciation/json'
            },

            body: `
    metadata: {
        axes: {
            keys: 'code'
            values: 'literacy-rate'
        },
        visualize: {
            basemap: 'africa',
            map-key-attr: 'ADM0_A3'
        }
    }`
        })
    }

    //
    // const getResponse = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}/data`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': process.env.API_KEY,
    //     }
    // })

    //publishes chart online with chartId in the URL
    const publishResponse = await fetch(`https://api.datawrapper.de/charts/${chartId}/publish`, {
        method: 'POST',
        headers: {
            'Authorization': process.env.API_KEY,
        }
    });
    return chartId;
}