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

            body: `borough,value
            Barnet,4
            Bexley,3
            Merton,7
            `
        });

        const patchResponse = fetch(`https://api.datawrapper.de/v3/charts/${chartId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': process.env.API_KEY,
                'content-type': 'application/json'
            },
            // body: '{\n    "metadata": {\n      "axes": {\n          "keys": "code",\n          "values": "literacy-rate"\n      },\n      "visualize": {\n          "basemap": "africa",\n          "map-key-attr": "ADM0_A3"\n      }\n    }\n  }',
            body: JSON.stringify({
                'metadata': {
                    'axes': {
                        'keys': 'code',
                        'values': 'literacy-rate'
                    },
                    'visualize': {
                        'basemap': 'uk-lads-greater-london',
                        'map-key-attr': 'lad15nm'
                    }
                }
            })
        });


        const furtherPatch = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': process.env.API_KEY,
                'content-type': 'application/json'
            },
            // body: '{\n    "metadata": {\n      "describe": {\n          "source-name": "Our World in Data",\n          "source-url": "https://ourworldindata.org/literacy",\n          "intro": "Share of the population older than 14 years that is able to read and write, in African countries, 2015"\n      }\n    }\n}',
            body: JSON.stringify({
                'metadata': {
                    'describe': {
                        'source-name': 'Our World in Data',
                        'source-url': 'https://ourworldindata.org/literacy',
                        'intro': 'Share of the population older than 14 years that is able to read and write, in African countries, 2015'
                    }
                }
            })
        });

        const yetAnotherPatch = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': process.env.API_KEY,
                'content-type': 'application/json'
            },
            // body: '{\n    "metadata": {\n      "visualize": {\n        "tooltip": {\n          "body": "{{ literacy_rate }}% of adults in this country can read.",\n          "title": "{{ country }}",\n          "fields": {\n            "code": "code",\n            "country": "country",\n            "literacy_rate": "literacy-rate"\n          }\n        }\n      }\n    }\n}',
            body: JSON.stringify({
                'metadata': {
                    'visualize': {
                        'tooltip': {
                            'body': '{{ value }}%',
                            'title': '{{ borough }}',
                            'fields': {
                                'code': 'code',
                                'borough': 'borough',
                                'value': 'value'
                            }
                        }
                    }
                }
            })
        });
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

    const getPublish = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}`, {
        headers: {
            'Authorization': process.env.API_KEY,
            'content-type': 'application/json'
        }
    });
    const publishJSON = await getPublish.json();
    console.log("getPublish");
    console.log(publishJSON.metadata.publish['embed-codes']);

    return chartId;
}
