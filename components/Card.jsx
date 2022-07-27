import { useState } from "react";
import Link from "next/link";
import ToolTip from "./Tooltip";
import HealthWarning from "./HealthWarning";
import React from "react";

export default function Card({ dataset, location }) {
  const [hover, setHover] = useState(false);

  function handleHover() {
    setHover(!hover);
  }

  const cardData = dataset.cardData;
  if (cardData.isNull) return null;
  return (
    <div className="flex flex-col w-1/4 justify-evenly min-w-[320px] max-w-[360px]">
      <div className="bg-ecnmy-white mb-1 flex flex-col rounded-t-lg">
        <ToolTip
          indicator={dataset.indicator}
          tooltips={dataset.metadata.tooltips}
        />
      </div>

      <div className="bg-ecnmy-white mb-1 p-4 rounded-b-lg">
        <h3 className="text-ecnmy-navy text-4xl text-center font-semibold">
          {dataset.cardData.locationData.Value.toLocaleString("en-UK")}
        </h3>
        <ul className="list-disc m-4 text-base">
          {cardData.change > 0 ? (
            <li>
              This has increased by {cardData.change?.toPrecision(3)}% from the
              previous collection ({cardData.previousYear})
            </li>
          ) : (
            <li>
              This has decreased by {-cardData.change?.toPrecision(3)}% from the
              previous collection ({cardData.previousYear})
            </li>
          )}
          {cardData.ranking > 0 ? (
            <li>This ranks {cardData.ranking}/33 of the London Boroughs</li>
          ) : null}
          {location === "London" ? null : (
            <li>London: {cardData.londonData?.toLocaleString("en-UK")}</li>
          )}
          {location === "United Kingdom" ? null : (
            <li>UK: {cardData.ukData?.toLocaleString("en-UK")}</li>
          )}
        </ul>

        <section className="flex justify-between items-center">
          <Link href={`/${location}/indicator/${dataset.indicator}`}>
            <a className="underline font-semibold hover:font-bold text-ecnmy-pumpkin">
              More Info
            </a>
          </Link>

          <div className="flex items-center">
            {dataset.metadata.source}
            {", "}
            {cardData.currentYear}
            <div>
              <HealthWarning
                metadata={dataset.metadata}
                year={cardData.currentYear}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
