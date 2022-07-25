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
            Burkina Faso,BFA,37.7
            Botswana,BWA,88.2
            Central African Republic,CAF,36.8
            Cote de Ivoire,CIV,43.3
            Cameroon,CMR,75
            Democratic Republic of Congo,COD,77.2
            Congo,COG,79.3
            Comoros,COM,78.1
            Cape Verde,CPV,88.5
            Algeria,DZA,79.6
            Egypt,EGY,75.8
            Eritrea,ERI,73.8
            Ethiopia,ETH,49
            Gabon,GAB,83.2
            Ghana,GHA,76.6
            Guinea,GIN,30.5
            Gambia,GMB,55.6
            Guinea-Bissau,GNB,59.8
            Equatorial Guinea,GNQ,95.2
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
            Sierra Leone,SLE,48.4
            Sao Tome and Principe,STP,91.7
            Swaziland,SWZ,87.5
            Chad,TCD,40
            Togo,TGO,66.5
            Tunisia,TUN,81.1
            Tanzania,TZA,80.4
            Uganda,UGA,73.8
            South Africa,ZAF,94.6
            Zambia,ZMB,85.1
            Zimbabwe,ZWE,86.9`
        });

        // const patchResponse = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Authorization': process.env.API_KEY,
        //         'content-type': 'application/json'
        //     },

        //     body:
        //         `{
        //         metadata: {
        //             axes: {
        //                 keys: 'code',
        //                 values: 'blah'
        //             },
        //             visualize: {
        //             basemap: 'africa', {
        //             map-key-attr: 'ADM0_A3' }
        //             }
        //         }
        //     }`
        // })

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
                        'basemap': 'africa',
                        'map-key-attr': 'ADM0_A3'
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
                            'body': '{{ literacy_rate }}% of adults in this country can read.',
                            'title': '{{ country }}',
                            'fields': {
                                'code': 'code',
                                'country': 'country',
                                'literacy_rate': 'literacy-rate'
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