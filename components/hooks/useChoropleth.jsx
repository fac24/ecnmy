import { useState, useEffect } from "react";

export default function useDatawrapper(indicator, location, chartType) {
    const [chartId, setChartId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataset, setDataset] = useState(null)
    const [csv, setCsv] = useState(null)

    useEffect(() => {
        let newCsv = `Location,${indicator}\n`;
        dataset.forEach((datum) => {
            newCsv += `${datum["Geography"]},${datum["Value"]}\n`
        })
        setCsv(newCsv)
    }, [dataset, indicator])


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

    return [chartId, loading, setDataset];
}