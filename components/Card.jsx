import { dictionary } from "../database/dictionary";
import { useState } from "react";
import Link from "next/link";

export default function Card({ dataset, location }) {
  const [hover, setHover] = useState(false);

  function handleHover() {
    setHover(!hover);
  }

  const cardData = dataset.cardData;
  if (cardData.isNull) return null;
  return (
    <div className="flex flex-col w-1/4 justify-evenly min-w-fit">
      <div className="bg-ecnmy-white mb-1 flex flex-col rounded-t-lg">
        {
          <h2 className="capitalize bg-ecnmy-grape text-ecnmy-white m-3 p-2 self-center text-center rounded-lg w-10/12 text-lg font-bold">
            {dictionary.hasOwnProperty(dataset.indicator) ? (
              <>
                <span
                  tabIndex={0}
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHover}
                  onFocus={handleHover}
                  onBlur={handleHover}
                >
                  {dataset.indicator}
                </span>{" "}
                <span className={`${hover ? "visible" : "invisible"}`}>
                  {dictionary[dataset.indicator]}
                </span>
              </>
            ) : (
              dataset.indicator
            )}
          </h2>
        }
      </div>
      <div className="bg-ecnmy-white mb-1 p-4 rounded-b-lg">
        <Link href={`/${location}/indicator/${dataset.indicator}`}>
          <a>
            <h3 className="text-ecnmy-navy text-4xl text-center font-semibold">
              {dataset.cardData.locationData.Value}
            </h3>
            <ul className="list-disc m-4 text-lg">
              {cardData.ranking > 0 ? (
                <li>This ranks {cardData.ranking}/33 of the London Boroughs</li>
              ) : null}
              {location === "London" ? null : (
                <li>The London value is {cardData.londonData}</li>
              )}
              {location === "United Kingdom" ? null : (
                <li>The Uk value is {cardData.ukData}</li>
              )}
              {cardData.change > 0 ? (
                <li>
                  This has increased by {cardData.change?.toPrecision(3)}%
                </li>
              ) : (
                <li>
                  This has decreased by {-cardData.change?.toPrecision(3)}%
                </li>
              )}
            </ul>
          </a>
        </Link>
      </div>
    </div>
  );
}
