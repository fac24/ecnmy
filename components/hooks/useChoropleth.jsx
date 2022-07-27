import { useState, useEffect } from "react";

export default function useDatawrapper() {
    const [chartId, setChartId] = useState(null);
    const [loading, setLoading] = useState(null);
    const [dataset, setDataset] = useState(null);
    const [indicator, setIndicator] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [csv, setCsv] = useState(null)

    useEffect(() => {
        let newCsv = `Location,${indicator}\n`;
        if (dataset !== null) {
            dataset.forEach((datum) => {
                newCsv += `${datum["Geography"]},${datum["Value"]}\n`
            })
            setCsv(newCsv)
        }
    }, [dataset, indicator])


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