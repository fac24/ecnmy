import dataVisualiser from "../utils/dataVisualiser";
import { selectDistinctTopicsWithData, selectTopicsWithLinkedData, selectAllByServerSideParam } from "../database/model";
import StyleSelect from "../components/StyleSelect";
import Select from "react-select"
import selectOptions from "../utils/selectOptions";
import { useState, useEffect } from "react";
import useChoropleth from "../components/hooks/useChoropleth";
import Loading from "../components/Loading"
import { useRouter } from "next/router";

const sortByYearReturningOneYear = (arr, slice) => {
    return arr
        .sort((a, b) => {
            return (
                parseInt(b.Time.substring(0, 4)) - parseInt(a.Time.substring(0, 4))
            );
        })
        .slice(slice[0], slice[1]);
};

export async function getServerSideProps(params) {
    if (params.location !== "favicon.ico") {
        const datasets = await selectAllByServerSideParam("datasets")
        const topics = await selectDistinctTopicsWithData();
        const allIndicatorOptions = await selectTopicsWithLinkedData();
        const filteredAllIndicators = allIndicatorOptions.filter((optionA, index, arr) => arr.findIndex(optionB => (optionB.indicator === optionA.indicator)) === index)
        const topicOptions = [
            { value: "All", label: "All" },
            ...selectOptions(topics),
        ];

        const location = params.location;
        //Geography,Values
        //

        return {
            props: {
                datasets,
                topicOptions,
                topics,
                allIndicatorOptions,
                filteredAllIndicators
            },
        };
    } else {
        return {
            props: {}
        }
    }
}

export default function Map({
    datasets,
    topics,
    topicOptions,
    invisible,
    allIndicatorOptions,
    filteredAllIndicators
}) {
    const router = useRouter()
    const [topic, setTopic] = useState({ value: "All", label: "All" });
    const [indicator, setIndicator] = useState(null)
    const [indicatorOptions, setIndicatorOptions] = useState(selectOptions(filteredAllIndicators))
    const [mapId, mapLoading, setMapData, setMapIndicator] = useChoropleth()

    useEffect(() => {
        const filteredIndicators = topic.value === "All" ? filteredAllIndicators : allIndicatorOptions.filter((option) => option.name === topic.value);
        const newOptions = selectOptions(filteredIndicators, "indicator")
        setIndicatorOptions(newOptions)
    }, [topic, allIndicatorOptions, filteredAllIndicators])


    useEffect(() => {
        if (indicator !== null) {
            const indicatorToFilter = indicator.value;
            const [filteredDatasets] = datasets.filter((dataset) => dataset.indicator === indicatorToFilter);
            console.log(filteredDatasets);
            const data = filteredDatasets.data.data.filter((dataset) => dataset.Geography !== "London").filter((dataset) => dataset.Geography !== "United Kingdom");
            setMapData(sortByYearReturningOneYear(data, [0, 33]));
            setMapIndicator(indicatorToFilter)
        }
    }, [datasets, setMapData, indicator, setMapIndicator])

    useEffect(() => {

        datawrapper.on('region.click', (event) => {
            if (indicator !== null) {
                router.push(`/${event.data.Location}/indicator/${indicator.value}`)
            }
        });
    })

    return (
        <>
            <form
                method="POST"
                className="grid place-items-center gap-3 p-10"
            >
                <div className="flex justify-around w-full max-w-xl m-auto flex-wrap">
                    <StyleSelect
                        defaultValue={topic}
                        options={topicOptions}
                        id="topic"
                        setChange={setTopic}
                    />
                    <StyleSelect
                        options={indicatorOptions}
                        id="indicator"
                        setChange={setIndicator}
                    />
                </div>

                <button
                    className=" text-lg px-4 py-2 bg-ecnmy-mint rounded-xl hover:font-bold"
                    type="submit"
                >
                    GO!
                </button>
            </form>

            <div className={`w-1/2 h-[1600px] m-auto`}>
                {mapLoading === null ? null : mapLoading ? <Loading /> :
                    <iframe id="datawrapper-chart-0jKkG" src={`https://datawrapper.dwcdn.net/${mapId}/1/`} className="w-full min-w-full h-full" scrolling="no" frameBorder="0">
                    </iframe>}
            </div>
        </>
    );
}