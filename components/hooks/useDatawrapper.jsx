import { useState, useEffect } from "react";

export default function useDatawrapper(csv, indicator, location, chartType) {
  const [chartId, setChartId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sends the details to datawrapper-proxy to then send to datawrapper
  useEffect(() => {
    setLoading(true);
    fetch("/api/datawrapper-proxy", {
      method: "POST",
      body: JSON.stringify({
        csv,
        indicator,
        location,
        chartType,
      }),
    })
      .then((resolve) => resolve.json())
      .then((resolve) => {
        setChartId(resolve.chartId);
        setLoading(false);
      });
  }, [csv, indicator, location, chartType]);

  return [chartId, loading];
}
