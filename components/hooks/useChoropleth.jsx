import { useState, useEffect } from "react";

export default function useDatawrapper() {
  const [chartId, setChartId] = useState(null);
  const [loading, setLoading] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [indicator, setIndicator] = useState(null);
  const [csv, setCsv] = useState(null);

  // this comes into action when the dataset and indicator changes creating a new csv to send to datawrapper
  useEffect(() => {
    let newCsv = `Location,${indicator}\n`;
    if (dataset !== null) {
      dataset.forEach((datum) => {
        newCsv += `${datum["Geography"]},${datum["Value"]}\n`;
      });
      setCsv(newCsv);
    }
  }, [dataset, indicator]);

  // Send the datawrapper-proxy the details needed to send to datawrapper
  useEffect(() => {
    setLoading(true);
    fetch("/api/datawrapper-proxy", {
      method: "POST",
      body: JSON.stringify({
        csv,
        indicator,
        location: null,
        chartType: "d3-maps-choropleth",
      }),
    })
      .then((resolve) => resolve.json())
      .then((resolve) => {
        setChartId(resolve.chartId);
        setLoading(false);
      });
  }, [csv, indicator]);

  return [chartId, loading, setDataset, setIndicator];
}
