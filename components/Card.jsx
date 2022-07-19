import { dictionary } from "../database/dictionary";
import { useState } from "react";


export default function Card({ dataset }) {
  const [hover, setHover] = useState(false);

  function handleHover() {
    setHover(!hover);
  }

  const cardData = dataset.cardData;
  return (
    <div className="border-2">
      <h3>{dataset.cardData.locationData.Value}</h3>
      {<h2 className="capitalize">{dictionary.hasOwnProperty(dataset.indicator) ? (<><span tabIndex={0} onMouseEnter={handleHover} onMouseLeave={handleHover} onFocus={handleHover} onBlur={handleHover}>{dataset.indicator}</span>{" "}<span className={`${hover ? "visible" : "invisible"}`}>{dictionary[dataset.indicator]}</span></>) : dataset.indicator}</h2>}
      <ul>
        <li>This ranks {cardData.ranking}/33 of the London Boroughs</li>
        <li>The London value is {cardData.londonData}</li>
        <li>The Uk value is {cardData.ukData}</li>
        {cardData.change > 0 ? (
          <li>This has increased by {cardData.change.toPrecision(3)}%</li>
        ) : (
          <li>This has decreased by {-cardData.change.toPrecision(3)}%</li>
        )}
      </ul>
    </div>
  );
}
