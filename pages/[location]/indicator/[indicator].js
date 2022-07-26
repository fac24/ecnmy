import { selectDatasetByIndicator } from "../../../database/model";
import cardDataArranger from "../../../utils/cardDataArranger";
import dataVisualiser from "../../../utils/dataVisualiser";
import React from "react";

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
    let happinessCsv = `Year,${indicator}\n`;
    let boroughDataSortedByYear = boroughData.sort((a, b) => {
      return (
        parseInt(a.Time.substring(0, 4)) - parseInt(b.Time.substring(0, 4))
      );
    });
    let yearNumber = boroughDataSortedByYear.length;

    boroughDataSortedByYear.map((datum) => {
      happinessCsv += `${datum["Time"]},${datum["Value"]}\n`;
    });
    //Geography,Values
    //

    const lineChartId = await dataVisualiser(
      happinessCsv,
      indicator,
      location,
      "d3-lines"
    );
    const tableId = await dataVisualiser(
      happinessCsv,
      indicator,
      location,
      "tables"
    );

    return {
      props: {
        location,
        boroughData,
        metadata,
        locationDataset,
        lineChartId,
        tableId,
        yearNumber,
      },
    };
  } else {
    return {
      props: {},
    };
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
}) {
  return (
    <main>
      <div className="flex items-center flex-wrap justify-around">
        <div className="p-5 rounded-xl  max-w-[400px]">
          <h1 className="blue capitalize font-bold">
            {locationDataset.indicator} in {location}
          </h1>
          <h2>
            <span className="font-medium">Name of study:</span> {metadata.title}
          </h2>
          <h3>
            <span className="font-medium">Last updated: </span>
            {metadata.release_date.substring(0, 4)}
          </h3>
          <p>
            <span className="font-medium">Description:</span>
            {metadata.description}
          </p>
        </div>
        <div className=" h-[400px] w-full min-w-[310px] max-w-[610px] p-5 ">
          <iframe
            aria-label={`A chart showing the change in ${indicator} in ${location}`}
            id="datawrapper-chart-0jKkG"
            src={`https://datawrapper.dwcdn.net/${lineChartId}/1/`}
            className="w-full min-w-full h-full"
            scrolling="no"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
      <div className="w-1/2 h-[135px] m-auto border  p-6">
        <iframe
          aria-label={`A table for ${indicator} in ${location}`}
          id="datawrapper-chart-0jKkG"
          src={`https://datawrapper.dwcdn.net/${tableId}/1/`}
          className="w-full min-w-full h-full"
          scrolling="no"
          frameBorder="0"
        ></iframe>
      </div>
    </main>
  );
}
