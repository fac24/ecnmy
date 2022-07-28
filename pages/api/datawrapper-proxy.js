import dataVisualiser from "../../utils/dataVisualiser";

// Datawrapper-proxy needed as datawrapper only allows for serverside rendering of charts
// We can get arround this ssr by using a proxy api route, thus allowing us to client side render and move swiftly between pages
export default async function handler(req, res) {
  const { csv, indicator, location, chartType } = JSON.parse(req.body);

  const chartId = await dataVisualiser(csv, indicator, location, chartType);

  res.status(200).json({ chartId });
}
