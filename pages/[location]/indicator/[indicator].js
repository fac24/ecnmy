import { selectDatasetByIndicator } from "../../../database/model";
import cardDataArranger from "../../../utils/cardDataArranger";

export async function getServerSideProps({ params }) {
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

  const locationDataset = cardDataArranger([dataset], location);

  return {
    props: { indicator, location, boroughData, metadata, locationDataset },
  };
}

export default function Indicator({
  indicator,
  location,
  boroughData,
  metadata,
  locationDataset,
}) {
  return (
    <main>
      <h1 className="blue">Indicator Page</h1>
      <h2>
        {metadata.title}: {indicator}
      </h2>
      <p>{metadata.description}</p>
    </main>
  );
}
