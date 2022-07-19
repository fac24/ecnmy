export default function Card({ dataset }) {
  const cardData = dataset.cardData;
  return (
    <div className="border-2">
      <h2 className="capitalize">{dataset.indicator}</h2>
      <h3>{dataset.cardData.locationData.Value}</h3>
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
