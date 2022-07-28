export default async function dataVisualiser(
  indicatorCsv,
  indicator,
  location,
  chartType
) {
  let title;
  if (chartType === "d3-lines") {
    title = `A chart showing change in ${indicator} in ${location}`;
  } else if (chartType === "tables") {
    title = `Table: ${indicator} in ${location}`;
  } else if (chartType === "d3-maps-choropleth") {
    title =
      indicator === null ? " " : `A choropleth showing ${indicator} in London`;
  }

  //initialises empty chart
  const postResponse = await fetch("https://api.datawrapper.de/v3/charts", {
    method: "POST",
    headers: {
      Authorization: process.env.API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      type: chartType,
      lastEditStep: 3,
    }),
  });

  //chartId needed for URL that will ultimately be put into the iframe on the page
  const postJson = await postResponse.json();
  const chartId = postJson.id;

  //populates chart with data
  const putResponse = await fetch(
    `https://api.datawrapper.de/v3/charts/${chartId}/data`,
    {
      method: "PUT",
      headers: {
        Authorization: process.env.API_KEY,
        "content-type": "text/csv",
      },

      body: indicatorCsv,
    }
  );

  //for choropleth, sets basemap and adds tooltip
  if (chartType === "d3-maps-choropleth") {
    const patchResponse = await fetch(
      `https://api.datawrapper.de/v3/charts/${chartId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: process.env.API_KEY,
          "content-type": "application/json",
        },

        body: JSON.stringify({
          metadata: {
            axes: {
              keys: "code",
              values: "literacy-rate",
            },
            visualize: {
              basemap: "uk-lads-greater-london",
              "map-key-attr": "lad15nm",
            },
          },
        }),
      }
    );

    // This adds the hover tooltip for the choropleth
    const addTooltip = await fetch(
      `https://api.datawrapper.de/v3/charts/${chartId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: process.env.API_KEY,
          "content-type": "application/json",
        },

        body: JSON.stringify({
          metadata: {
            visualize: {
              tooltip: {
                body: `Indicator value: {{ indicator }}`,
                title: "Borough: {{ location }}",
                fields: {
                  location: "location",
                  indicator: indicator,
                },
              },
            },
          },
        }),
      }
    );
  }

  //publishes chart online with chartId in the URL
  const publishResponse = await fetch(
    `https://api.datawrapper.de/charts/${chartId}/publish`,
    {
      method: "POST",
      headers: {
        Authorization: process.env.API_KEY,
      },
    }
  );

  return chartId;
}
