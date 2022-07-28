import { selectDatasetByIndicator } from "../../database/model";

export default async function handler(req, res) {
  const { indicator } = JSON.parse(req.body);

  const dataset = await selectDatasetByIndicator(indicator);

  res.status(200).json({ dataset });
}
