import dataVisualiser from "../../utils/dataVisualiser";

export default async function handler(req, res) {
  const { csv, indicator, location, chartType } = JSON.parse(req.body);

  const chartId = await dataVisualiser(csv, indicator, location, chartType);

  res.status(200).json({ chartId });
}
